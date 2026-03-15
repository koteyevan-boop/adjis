# Website Static Export Instructions

## Export Main Website (Static)

1. Temporarily move portal routes to avoid export conflicts
2. Run export command
3. Deploy static files

### Step 1: Backup Portal Routes
```bash
mkdir backup-portals
mv src/app/portals backup-portals/
```

### Step 2: Export Website
```bash
npm run export
```

### Step 3: Deploy Static Files
- Upload `out/` folder to your hosting platform
- This contains the main website only

## Portal Server Deployment

### Step 1: Restore Portal Routes
```bash
mv backup-portals/portals src/app/
```

### Step 2: Deploy Portal Server
```bash
npm run build
npm start
```

### Step 3: Configure Links
- Update website links to point to portal server
- Example: `https://portals.yourschool.com`
