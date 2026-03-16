#!/usr/bin/env node

// Build optimization script for Render deployment
const fs = require('fs');
const path = require('path');

console.log('🚀 Optimizing build for Render deployment...');

// Create .env.production with optimizations
const envProduction = `
NODE_ENV=production
NODE_OPTIONS="--max-old-space-size=4096"
NEXT_TELEMETRY_DISABLED=1
ANALYZE=false
TURBOPACK=1
`;

fs.writeFileSync('.env.production', envProduction.trim());
console.log('✅ Created optimized .env.production');

// Update package.json build script
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add optimized build script
packageJson.scripts['build:optimized'] = 'npm run clean && npm run build:prod';
packageJson.scripts['build:prod'] = 'NODE_ENV=production NODE_OPTIONS="--max-old-space-size=4096" next build';
packageJson.scripts['clean'] = 'rm -rf .next out';

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('✅ Updated package.json with optimized build scripts');

// Create render-specific build script
const renderBuildScript = `#!/bin/bash
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
`;

fs.writeFileSync('build-render.sh', renderBuildScript);
fs.chmodSync('build-render.sh', '755');
console.log('✅ Created render-specific build script');

console.log('🎯 Build optimization complete!');
console.log('📋 Next steps:');
console.log('1. Commit and push these changes');
console.log('2. Render will use the optimized configuration');
console.log('3. Build should complete within timeout limits');
