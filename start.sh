#!/usr/bin/env bash

# =========================
# Configuration
# =========================
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"
BACKEND_DIR="$ROOT_DIR/backend"

MODE="prod"

# =========================
# Argument parsing
# =========================
for arg in "$@"; do
  case "$arg" in
    -d|-dev)
      MODE="dev"
      ;;
  esac
done

echo "Mode: $MODE"
echo

# =========================
# Development mode
# =========================
if [ "$MODE" = "dev" ]; then
  echo "Starting Next.js (dev)..."
  cd "$FRONTEND_DIR" || exit 1
  npm run dev &

  echo "Starting NestJS (dev)..."
  cd "$BACKEND_DIR" || exit 1
  npm run start:dev &

  wait
  exit 0
fi

# =========================
# Production mode
# =========================
echo "Building Next.js..."
cd "$FRONTEND_DIR" || exit 1
npm run build
echo "Starting Next.js (prod)..."
npm run start &

echo
echo "Building NestJS..."
cd "$BACKEND_DIR" || exit 1
npm run build
echo "Starting NestJS (prod)..."
npm run start &

wait
