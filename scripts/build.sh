#!/bin/bash
set -Eeuo pipefail

# Use the directory where this script is located as the workspace
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$SCRIPT_DIR}"

cd "${COZE_WORKSPACE_PATH}"

echo "Installing dependencies..."
pnpm install --prefer-frozen-lockfile --prefer-offline --loglevel debug --reporter=append-only

echo "Building the Next.js project..."
pnpm next build

echo "Build completed successfully!"
