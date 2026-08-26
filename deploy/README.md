# Deploy SeeDAO v1 官网 (Docker + Nginx)

域名：**`https://v1.seedao.xyz`**

架构：

```text
Browser
  → v1.seedao.xyz (宿主机 Nginx TLS)
       → 127.0.0.1:3080 (Docker 容器 seedao-website，内嵌 Nginx SPA)
```

镜像由 GitHub Actions 构建，服务器**只拉镜像、不编译**。

---

## 完整部署步骤（新服务器）

以下命令在 **Ubuntu 22.04/24.04** 上可直接执行。将 `YOUR_GITHUB_USERNAME`、`YOUR_PAT` 替换为你的 GitHub 用户名和 PAT（需 `read:packages` 权限，若镜像为 Private）。

### 0. 前置：DNS 与安全组

在域名 DNS 控制台添加：

| Host | Type | Value           |
| ---- | ---- | --------------- |
| `v1` | A    | 新服务器公网 IP |

验证（本地或服务器）：

```bash
dig +short v1.seedao.xyz
```

云厂商安全组放行 **80、443**。国内服务器需域名 **ICP 备案**。

---

### 1. 安装 Docker、Nginx、Certbot

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl git nginx certbot python3-certbot-nginx

# Docker（官方脚本）
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker "$USER"
newgrp docker
```

确认：

```bash
docker --version
docker compose version
nginx -v
```

---

### 2. 拉取部署仓库

```bash
sudo mkdir -p /srv/seedao2
sudo chown "$USER":"$USER" /srv/seedao2
cd /srv/seedao2
git clone https://github.com/seedao-polis/seedao-v1-web.git
cd seedao-v1-web
```

---

### 3. 配置 Nginx（HTTP，先于容器启动）

Certbot 需要 Nginx 先监听 80 并识别 `v1.seedao.xyz`。此时后端容器尚未启动，502 正常；证书申请只依赖 `/.well-known/`。

```bash
sudo mkdir -p /var/www/certbot
sudo cp deploy/nginx/v1.seedao.xyz.conf /etc/nginx/conf.d/v1.seedao.xyz.conf
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl reload nginx
```

冒烟（可能 502，说明 Nginx 已生效）：

```bash
curl -I http://v1.seedao.xyz
```

---

### 4. 申请 HTTPS 证书

```bash
sudo certbot --nginx -d v1.seedao.xyz
```

按提示填写邮箱并同意条款。成功后 Certbot 会自动改 Nginx 配置启用 HTTPS。

验证续期：

```bash
sudo certbot renew --dry-run
```

也可手动参考 `deploy/nginx/v1.seedao.xyz.https.conf.example`。

---

### 5. 确保 Docker 镜像已构建

在 GitHub 仓库 [seedao-v1-web Actions](https://github.com/seedao-polis/seedao-v1-web/actions) 确认 **Docker publish** 已成功；或 push 到 `main` 触发：

```bash
# 本地执行（若尚未构建过镜像）
git push origin dev:main
```

目标镜像：

```text
ghcr.io/seedao-polis/seedao-v1-web:latest
```

若包为 Private：GitHub → Packages → 设为 Public，或使用 PAT 登录（下一步）。

---

### 6. 配置环境变量

```bash
cd /srv/seedao2/seedao-v1-web
cp deploy/.env.example deploy/.env
nano deploy/.env
```

内容示例：

```bash
WEB_IMAGE=ghcr.io/seedao-polis/seedao-v1-web:latest
HOST_PORT=3080
```

---

### 7. 登录 GHCR 并启动容器

**Private 镜像必须登录：**

```bash
echo YOUR_PAT | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
```

**启动：**

```bash
chmod +x deploy/pull-and-up.sh
./deploy/pull-and-up.sh
```

检查：

```bash
docker compose -f deploy/docker-compose.yml ps
docker logs seedao-website
curl -sS http://127.0.0.1:3080/health
# 应输出: ok
```

---

### 8. 验证线上访问

```bash
curl -I https://v1.seedao.xyz
curl -sS https://v1.seedao.xyz/health
```

浏览器打开 `https://v1.seedao.xyz`，测试 `/intro`、`/journey` 等 SPA 路由。

---

### 9. 后续更新

代码合并到 `main` 且 CI 完成后，在服务器：

```bash
cd /srv/seedao2/seedao-v1-web
git pull
./deploy/pull-and-up.sh
```

---

## 端口说明

默认宿主机端口 **3080**（容器内仍为 3000），避免与同机其他前端（如 seedao-pwa 占用的 3000）冲突。

`deploy/.env` 中 `HOST_PORT` 必须与 Nginx `proxy_pass` 一致：

| 文件                                   | 配置                                |
| -------------------------------------- | ----------------------------------- |
| `deploy/.env`                          | `HOST_PORT=3080`                    |
| `/etc/nginx/conf.d/v1.seedao.xyz.conf` | `proxy_pass http://127.0.0.1:3080;` |

若改用其他端口（如 `3090`），两处同步修改后：

```bash
sudo nginx -t && sudo systemctl reload nginx
./deploy/pull-and-up.sh
```

---

## 故障排查

| 现象            | 排查                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------- |
| DNS 不通        | `dig +short v1.seedao.xyz` 是否指向本机 IP                                                |
| 502 Bad Gateway | `docker ps`、`curl 127.0.0.1:3080/health`；Nginx `proxy_pass` 端口是否与 `HOST_PORT` 一致 |
| pull 失败       | `docker login ghcr.io`；包是否 Public；`WEB_IMAGE` 小写                                   |
| 国内拉 GHCR 慢  | 配置 ACR secrets，改用阿里云镜像地址                                                      |
| Certbot 失败    | 80 端口是否开放；DNS 是否已生效                                                           |

---

## 目录说明

| 文件                                     | 作用             |
| ---------------------------------------- | ---------------- |
| `docker-compose.yml`                     | 拉取并运行镜像   |
| `.env.example`                           | `WEB_IMAGE` 模板 |
| `pull-and-up.sh`                         | 一键 pull + up   |
| `nginx/v1.seedao.xyz.conf`               | 宿主机 HTTP 反代 |
| `nginx/v1.seedao.xyz.https.conf.example` | HTTPS 参考       |
| `docker/nginx.conf`                      | 镜像内 SPA Nginx |
