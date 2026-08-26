#!/usr/bin/env bash
# Pull the latest pre-built image and recreate the container.
# Usage (on the server):
#   cd /srv/seedao2/seedao-website-v4
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

echo "→ Pulling $WEB_IMAGE"
docker compose -f deploy/docker-compose.yml --env-file "$ENV_FILE" pull

echo "→ Recreating seedao-website"
docker compose -f deploy/docker-compose.yml --env-file "$ENV_FILE" up -d

echo "→ Health"
sleep 2
curl -fsS http://127.0.0.1:3000/health && echo
echo "Done."
