#!/usr/bin/env bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

host="${PREVIEW_HOST:-0.0.0.0}"
interval="${PREVIEW_POLL_INTERVAL:-1}"
watch_paths=(src scripts/build-content.js)

pick_port() {
  if [[ -n "${PREVIEW_PORT:-}" ]]; then
    printf '%s\n' "$PREVIEW_PORT"
    return
  fi

  PREVIEW_HOST="$host" python3 - <<'PY'
import os
import socket

host = os.environ.get("PREVIEW_HOST", "0.0.0.0")

for port in range(8080, 8181):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        try:
            sock.bind((host, port))
        except OSError:
            continue
        print(port)
        break
else:
    raise SystemExit("No available preview port found between 8080 and 8180.")
PY
}

snapshot() {
  existing_paths=()
  for path in "${watch_paths[@]}"; do
    [[ -e "$path" ]] && existing_paths+=("$path")
  done

  if (( ${#existing_paths[@]} == 0 )); then
    printf 'no-watch-paths'
    return
  fi

  find "${existing_paths[@]}" -type f \
    ! -path '*/.git/*' \
    ! -path '*/node_modules/*' \
    -printf '%T@ %s %p\0' \
    | LC_ALL=C sort -z \
    | sha256sum \
    | awk '{print $1}'
}

rebuild() {
  printf '\n[%s] Rebuilding build/...\n' "$(date '+%H:%M:%S')"

  if node scripts/build-content.js; then
    printf '[%s] Rebuild complete.\n' "$(date '+%H:%M:%S')"
    return 0
  fi

  printf '[%s] Rebuild failed. Fix the error and save again.\n' "$(date '+%H:%M:%S')" >&2
  return 1
}

print_preview_urls() {
  echo "Serving build/ at http://${host}:${port}"
  echo "Local URL: http://localhost:${port}"
}

cleanup() {
  if [[ -n "${server_pid:-}" ]] && kill -0 "$server_pid" >/dev/null 2>&1; then
    kill "$server_pid" >/dev/null 2>&1 || true
    wait "$server_pid" 2>/dev/null || true
  fi
}

trap cleanup EXIT INT TERM

rebuild

port="$(pick_port)"
PREVIEW_HOST="$host" PREVIEW_PORT="$port" python3 - <<'PY' &
import functools
import http.server
import os
import posixpath
import socketserver
import urllib.parse

host = os.environ.get("PREVIEW_HOST", "0.0.0.0")
port = int(os.environ["PREVIEW_PORT"])
directory = os.path.join(os.getcwd(), "build")


class ExtensionlessHandler(http.server.SimpleHTTPRequestHandler):
    def _candidate_from_request(self):
        parsed = urllib.parse.urlsplit(self.path)
        request_path = parsed.path or "/"

        if request_path == "/" or posixpath.splitext(request_path)[1]:
            return None

        return request_path.rstrip("/") + ".html"

    def send_head(self):
        candidate = self._candidate_from_request()

        if candidate:
            local_candidate = self.translate_path(candidate)
            if os.path.isfile(local_candidate):
                parsed = urllib.parse.urlsplit(self.path)
                self.path = urllib.parse.urlunsplit(
                    ("", "", candidate, parsed.query, parsed.fragment)
                )

        return super().send_head()


class PreviewServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True


handler = functools.partial(ExtensionlessHandler, directory=directory)

with PreviewServer((host, port), handler) as httpd:
    httpd.serve_forever()
PY
server_pid="$!"

echo
print_preview_urls
echo "Watching ${watch_paths[*]} with ${interval}s polling. Press Ctrl+C to stop."

last_snapshot="$(snapshot)"

while true; do
  sleep "$interval"
  current_snapshot="$(snapshot)"

  if [[ "$current_snapshot" != "$last_snapshot" ]]; then
    last_snapshot="$current_snapshot"
    if rebuild; then
      print_preview_urls
    fi
    last_snapshot="$(snapshot)"
  fi
done
