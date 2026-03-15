#!/bin/bash

# GitHub Pages Deployment Script for ADJIS School Management System

echo "🚀 Starting GitHub Pages deployment..."

# Check if gh-pages branch exists
if ! git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "📦 Creating gh-pages branch..."
    git checkout --orphan gh-pages
    git rm -rf .
    echo "# ADJIS School Management System" > README.md
    git add README.md
    git commit -m "Initial gh-pages setup"
    git checkout main
else
    echo "✅ gh-pages branch already exists"
fi

# Build the project
echo "🔨 Building the project..."
npm run build

# Create .nojekyll file to prevent GitHub Pages from treating it as Jekyll site
touch out/.nojekyll

# Copy build output to gh-pages branch
echo "📋 Copying build files to gh-pages branch..."
git checkout gh-pages
git rm -rf . 2>/dev/null || true
cp -r .next/* .
cp .nojekyll . 2>/dev/null || true

# Add and commit changes
echo "💾 Committing changes..."
git add .
git commit -m "Deploy to GitHub Pages - $(date)"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin gh-pages --force

# Switch back to main branch
git checkout main

echo "✅ Deployment completed! Your site should be available at:"
echo "https://[your-username].github.io/[your-repo-name]/"
echo ""
echo "Note: It may take a few minutes for GitHub Pages to update."
