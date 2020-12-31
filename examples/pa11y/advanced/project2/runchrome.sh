#!/usr/bin/env bash
set -euo pipefail
${HOME}/.guix-profile/bin/chromium --use-gl=swiftshader $@
