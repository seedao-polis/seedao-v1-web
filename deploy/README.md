# Deploy SeeDAO 官网 (Docker + Nginx)

参考 [seedao-pwa/deploy](https://github.com/seedao-polis/seedao-pwa/tree/main/deploy) 的结构。  
本仓库是 **Create React App 静态站**，镜像内用 Nginx 托管 `build/`，对外仍只监听 `127.0.0.1:3000`。

域名：

- 官网：`https://seedao.xyz` → 本容器（`seedao-website:3000`）

架构：

```text
Browser
  → seedao.xyz (宿主机 Nginx TLS)
       → 127.0.0.1:3000 (容器内 Nginx SPA)
```

> 若与 `seedao-pwa` 同机部署且都占用 `3000`，请改本项目 `docker-compose.yml` 端口映射（例如 `127.0.0.1:3080:3000`），并同步改宿主机 Nginx 的 `proxy_pass`。

## 0. 前置条件

- 阿里云 ECS 已安装 Docker + Compose 插件、Nginx
- 域名 `seedao.xyz` 已完成 **ICP 备案**（国内访问 HTTPS 需要）
- 安全组放行 **80 / 443**

## 1. DNS

| Host             | Type       | Value                |
| ---------------- | ---------- | -------------------- |
| `@` (seedao.xyz) | A          | ECS 公网 IP          |
| `www`            | A 或 CNAME | 同 IP / `seedao.xyz` |

确认不再指向 Netlify / GitHub Pages。

```bash
dig +short seedao.xyz
```

## 2. 把 deploy 放到服务器

```bash
sudo mkdir -p /srv/seedao2
sudo chown "$USER":"$USER" /srv/seedao2
cd /srv/seedao2
git clone https://github.com/seedao-polis/seedao-v1-web.git seedao-v1-web
cd seedao-v1-web
```

也可只拷贝 `deploy/` 目录。

## 3. GitHub Actions → 镜像仓库

工作流：`.github/workflows/docker-publish.yml`

触发：push 到 `main` / `master`、tag `v*`，或手动 **Run workflow**。

### 默认：GHCR

```text
ghcr.io/<owner>/<repo>:latest
ghcr.io/<owner>/<repo>:sha-<short>
```

例如：`ghcr.io/seedao-polis/seedao-v1-web:latest`

首次构建成功后：

1. GitHub → **Packages** → 打开对应包
2. 设为 **Public**，或保持 Private 并在服务器用带 `read:packages` 的 PAT 登录

### 可选：同步推送到阿里云 ACR（国内拉取更快）

Repo → **Settings → Secrets and variables → Actions** 增加：

| Secret          | 示例                                |
| --------------- | ----------------------------------- |
| `ACR_REGISTRY`  | `registry.cn-hangzhou.aliyuncs.com` |
| `ACR_NAMESPACE` | 你的命名空间                        |
| `ACR_USERNAME`  | ACR 用户名                          |
| `ACR_PASSWORD`  | ACR 密码 / Token                    |

然后 `WEB_IMAGE` 可写成：

```text
registry.cn-hangzhou.aliyuncs.com/<namespace>/seedao-website:latest
```

## 4. 服务器配置 env

```bash
cp deploy/.env.example deploy/.env
nano deploy/.env
```

至少设置：

```bash
WEB_IMAGE=ghcr.io/seedao-polis/seedao-v1-web:latest
```

GHCR 的 owner/repo 需为小写。

## 5. 登录仓库并启动容器

**GHCR（私有包）：**

```bash
echo YOUR_PAT | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
```

**阿里云 ACR：**

```bash
docker login registry.cn-hangzhou.aliyuncs.com -u <user> -p <password>
```

启动：

```bash
cd /srv/seedao2/seedao-v1-web
chmod +x deploy/pull-and-up.sh
./deploy/pull-and-up.sh
```

检查：

```bash
docker compose -f deploy/docker-compose.yml ps
docker logs -f seedao-website
curl -sS http://127.0.0.1:3000/health
```

容器只绑定本机 `3000`，不会把 Node/Nginx 端口暴露到公网 IP。

## 6. 宿主机 Nginx

```bash
sudo mkdir -p /var/www/certbot
sudo cp deploy/nginx/seedao.xyz.conf /etc/nginx/conf.d/seedao.xyz.conf
sudo nginx -t && sudo systemctl reload nginx
```

冒烟：

```bash
curl -I http://seedao.xyz
```

## 7. HTTPS（Let's Encrypt）

```bash
sudo apt-get update && sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d seedao.xyz -d www.seedao.xyz
```

或在证书就绪后，参考 `deploy/nginx/seedao.xyz.https.conf.example`。

```bash
sudo certbot renew --dry-run
```

## 8. 更新（重新部署）

`main`/`master` CI 完成后：

```bash
cd /srv/seedao2/seedao-v1-web
./deploy/pull-and-up.sh
```

无需在 ECS 上构建。

## 9. 本地构建镜像（可选）

```bash
docker build -t seedao-website:local .
docker run --rm -p 3000:3000 seedao-website:local
curl -sS http://127.0.0.1:3000/health
```

## 10. 故障排查

| 现象                  | 排查                                                           |
| --------------------- | -------------------------------------------------------------- |
| 国内超时              | 安全组 80/443；ICP 备案；DNS A 记录                            |
| 502 Bad Gateway       | `docker ps` / `curl 127.0.0.1:3000/health`；Nginx `proxy_pass` |
| pull 被拒 / not found | GHCR 可见性或 `docker login`；`WEB_IMAGE` 小写                 |
| 国内拉 GHCR 慢/失败   | 配置 ACR secrets，改用 ACR 镜像                                |
| SPA 深链 404          | 容器内 nginx 需 `try_files ... /index.html`（已内置）          |
| 与 pwa 端口冲突       | 改本项目宿主机映射端口，并改 Nginx `proxy_pass`                |

## 本目录文件

| 文件                                  | 作用                                       |
| ------------------------------------- | ------------------------------------------ |
| `docker-compose.yml`                  | 拉取并运行前端镜像                         |
| `.env.example`                        | `WEB_IMAGE` 模板                           |
| `pull-and-up.sh`                      | `pull` + `up -d`                           |
| `nginx/seedao.xyz.conf`               | 宿主机 HTTP 反代                           |
| `nginx/seedao.xyz.https.conf.example` | HTTPS 参考                                 |
| `docker/nginx.conf`                   | **镜像内** SPA Nginx（随 Dockerfile 打包） |

仓库根目录 `Dockerfile` + `.github/workflows/docker-publish.yml` 负责构建并推送镜像。
