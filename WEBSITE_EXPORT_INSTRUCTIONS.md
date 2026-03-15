# 🌐 Website Export Instructions

## Issue: API Routes Prevent Static Export

The current project has API routes that prevent static export. Here's how to export just the website:

## Option 1: Temporary Remove API Routes

### Step 1: Backup API Routes
```bash
mkdir backup-api-temp
Move-Item src\app\api backup-api-temp\
```

### Step 2: Export Website
```bash
npm run export
```

### Step 3: Upload Website
- Upload the `out/` folder to your main website hosting
- This contains all website pages (45 pages total)

### Step 4: Restore API Routes (for Vercel)
```bash
Move-Item backup-api-temp\api src\app\
```

## Option 2: Use Existing Build

The `out/` folder should be created after removing API routes. If you don't see it:

1. **Check if hidden**: In file manager, enable "show hidden files"
2. **Look for**: `out/` folder in project root
3. **Contents**: Should have 45 HTML files + assets

## What's in the Export

### Website Pages (45 total)
- Home page (`/`)
- About pages (`/about/*`)
- Academics (`/academics/*`)
- Admissions (`/admissions/*`)
- Contact (`/contact`)
- Calendar (`/calendar`)
- Careers (`/careers`)
- News (`/news/*`)
- Memories (`/memories`)
- Principal (`/principal`)
- Portal Access (`/portals`)

### Portal Links
The portal page will link to your Vercel deployment:
- Student Portal → `your-vercel-app.vercel.app/portals/student`
- Parent Portal → `your-vercel-app.vercel.app/portals/parent`
- Admin Portal → `your-vercel-app.vercel.app/portals/admin`

## Quick Fix

Let me remove the API routes temporarily and regenerate the export:

```bash
# Remove API routes temporarily
Move-Item src\app\api backup-api-temp\

# Export website
npm run export

# Upload the 'out' folder to your main hosting
```

After uploading to your main hosting, you can restore API routes for Vercel deployment.

## Result

You'll have:
- **Main Website**: Static files on your hosting (josemariaschoolgh.org)
- **Portal System**: Full functionality on Vercel (portal.josemariaschoolgh.org)
