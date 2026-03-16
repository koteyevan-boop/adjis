#!/bin/bash
set -e

echo "🚀 Starting optimized Render build..."

# Set environment variables
export NODE_ENV=production
export NODE_OPTIONS="--max-old-space-size=4096"
export NEXT_TELEMETRY_DISABLED=1

# Clean previous build
rm -rf .next out

# Install dependencies with reduced memory
npm ci --production=false

# Build with optimizations
npm run build

echo "✅ Build completed successfully!"
