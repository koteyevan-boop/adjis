#!/bin/bash

# Static Website Deployment Script
# This script exports the static website for deployment to josemariaschoolgh.org

echo "🚀 Starting Static Website Export..."

# Step 1: Backup API and Portal routes
echo "📦 Backing up dynamic routes..."
mv src/app/api backup-api-temp 2>/dev/null || echo "API folder already backed up"
mv src/app/portals backup-portals-temp 2>/dev/null || echo "Portals folder already backed up"

# Step 2: Configure for static export
echo "⚙️ Configuring for static export..."
sed -i 's/trailingSlash: true,/trailingSlash: true,\n  output: '\''export'\'',/' next.config.js

# Step 3: Export static website
echo "📦 Exporting static website..."
npm run export

# Step 4: Restore configuration
echo "🔄 Restoring normal configuration..."
sed -i '/output: '\''export'\'',/d' next.config.js

# Step 5: Restore dynamic routes
echo "📂 Restoring dynamic routes..."
mv backup-api-temp src/app/api 2>/dev/null || echo "No API backup to restore"
mv backup-portals-temp src/app/portals 2>/dev/null || echo "No portals backup to restore"

# Step 6: Create deployment package
echo "📁 Creating deployment package..."
mkdir -p deploy-static
cp -r out/* deploy-static/

echo "✅ Static website export complete!"
echo "📁 Static files ready in 'deploy-static/' folder"
echo "🌐 Upload contents of 'deploy-static/' to josemariaschoolgh.org"
echo "🔐 Portal will remain on Render at portal.josemariaschoolgh.org"
