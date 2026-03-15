# 🚀 ADJIS Deployment Instructions

## ✅ Current Status
- **Static Export**: ✅ Successfully generated (26 pages)
- **Portal Components**: ✅ Backed up and ready for server deployment
- **Website**: ✅ Ready for static hosting

## 📁 Deployment Structure

### **Static Website (Current)**
- **Location**: `out/` folder
- **Content**: Main website + portal links
- **Hosting**: Any static hosting service
- **URL**: `https://yourschool.com`

### **Portal Server (Separate)**
- **Location**: Backup folders (`backup-api/`)
- **Content**: Full portal system with API routes
- **Hosting**: Node.js server required
- **URL**: `https://portals.yourschool.com`

## 🎯 Deployment Steps

### **Step 1: Deploy Static Website**
1. **Upload `out/` folder** to your hosting platform
2. **Configure domain** (e.g., `adjis.edu.gh`)
3. **Test website navigation**
4. **Verify portal links** point to portal server

### **Step 2: Deploy Portal Server**
1. **Restore portal components**:
   ```bash
   Move-Item backup-api\api src\app\
   Move-Item backup-api\portals-admin src\app\portals\admin
   Move-Item backup-api\portals-parent src\app\portals\parent
   Move-Item backup-api\portals-student src\app\portals\student
   Move-Item src\app\portals\page-dynamic.tsx src\app\portals\page.tsx
   ```

2. **Remove static export config**:
   ```bash
   # Edit next.config.js - remove "output: 'export'"
   ```

3. **Build and deploy**:
   ```bash
   npm run build
   npm start
   ```

4. **Configure portal server** with database and environment variables

## 🔧 Portal Server Configuration

### **Environment Variables**
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=adjis_db
```

### **Database Setup**
1. Create MySQL database
2. Run `/api/init-db` to initialize tables
3. Test all portal logins

## 🌐 URL Structure

### **Website URLs**
- Home: `https://yourschool.com`
- About: `https://yourschool.com/about`
- Academics: `https://yourschool.com/academics`
- Portal Access: `https://yourschool.com/portals`

### **Portal URLs**
- Student Portal: `https://portals.yourschool.com/student`
- Parent Portal: `https://portals.yourschool.com/parent`
- Admin Portal: `https://portals.yourschool.com/admin`

## 🔗 Link Configuration

### **Update Portal Links**
In the static website, update portal links to point to your portal server:

**File**: `src/app/portals/page-static.tsx`
```tsx
// Update these URLs to match your portal server
href="https://portals.yourschool.com/student"
href="https://portals.yourschool.com/parent"
href="https://portals.yourschool.com/admin"
```

## 🎯 Benefits of This Approach

### **Website (Static)**
✅ Fast loading times
✅ Low hosting costs
✅ High reliability
✅ CDN friendly

### **Portals (Server)**
✅ Full database functionality
✅ Real-time features
✅ User authentication
✅ API endpoints working

## 🚀 Quick Start

### **For Immediate Website Launch**
1. Upload `out/` folder to your hosting
2. Update portal links in `page-static.tsx`
3. Deploy portal server separately

### **Portal Server Setup**
1. Restore portal components (see Step 2 above)
2. Remove static export from `next.config.js`
3. Deploy to Node.js server
4. Configure database

## 📞 Support

### **Portal Access**
- Student: `student` / `password`
- Parent: `parent` / `password`
- Admin: `admin` / `password`

### **Technical Requirements**
- **Website**: Any static hosting (Netlify, Vercel, GitHub Pages)
- **Portals**: Node.js server with MySQL database
- **Domain**: Two domains or subdomains recommended

---

## ✅ Ready for Deployment

Your system is now ready for hybrid deployment:
- **Static website**: Ready for immediate upload
- **Portal server**: Components backed up and ready for server deployment
