#!/usr/bin/env bash
# Pull the latest pre-built image and recreate the container.
# Usage (on the server):
#   cd /srv/seedao2/seedao-v1-web
#   ./deploy/pull-and-up.sh

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

ENV_FILE="${ENV_FILE:-deploy/.env}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE — copy deploy/.env.example and set WEB_IMAGE." >&2
  exit 1
fi

# shellcheck disable=SC1090
set -a
# shellcheck source=/dev/null
source "$ENV_FILE"
set +a

if [[ -z "${WEB_IMAGE:-}" ]]; then
  echo "WEB_IMAGE is empty in $ENV_FILE" >&2
  exit 1
fi

# Pin the Compose project so a sibling frontend (seedao-pwa) that also uses
# deploy/docker-compose.yml is not treated as the same stack.
COMPOSE_PROJECT_NAME="${COMPOSE_PROJECT_NAME:-seedao-v1-web}"
compose() {
  docker compose -p "$COMPOSE_PROJECT_NAME" -f deploy/docker-compose.yml --env-file "$ENV_FILE" "$@"
}

echo "→ Project $COMPOSE_PROJECT_NAME  pulling $WEB_IMAGE"
compose pull

echo "→ Recreating seedao-website"
compose up -d

echo "→ Health"
sleep 2
host_port="${HOST_PORT:-3080}"
curl -fsS "http://127.0.0.1:${host_port}/health" && echo
echo "Done."
