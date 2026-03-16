# Separate Deployment Configuration

## 🎯 **Recommended Architecture**

### **🏠 Main Website (Static Hosting)**
- **Domain**: `josemariaschoolgh.org`
- **Content**: Static website pages
- **Features**: Information, news, events, contact forms
- **Deployment**: Export static files to current hosting

### **🔐 Portal System (Render)**
- **Domain**: `portal.josemariaschoolgh.org`
- **Content**: Dynamic portal with authentication
- **Features**: Login, dashboards, APIs, database
- **Deployment**: Render with server functions

---

## 🔄 **Current State Analysis**

### **✅ What's Working**
- Portal system working on `portal.josemariaschoolgh.org`
- Changes visible on portal subdomain
- Render deployment configured and functional

### **❌ What Needs Fixing**
- Main website not updating with latest changes
- Both domains serving from same source
- Need proper separation of static vs dynamic content

---

## 🏗️ **Implementation Plan**

### **Step 1: Configure Static Export for Main Website**
```javascript
// next.config.js - Add static export
const nextConfig = {
  output: 'export',  // Add this line
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
```

### **Step 2: Separate Portal Routes**
Create separate configuration for portal-only deployment:
```javascript
// next.portal.config.js - For Render portal deployment
const nextConfig = {
  // Dynamic configuration for portal only
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
```

### **Step 3: Update Portal Links**
Ensure main website links point to portal domain:
```html
<!-- Main website portal links -->
<a href="https://portal.josemariaschoolgh.org/portals">Parent Portal</a>
<a href="https://portal.josemariaschoolgh.org/portals">Staff Portal</a>
<a href="https://portal.josemariaschoolgh.org/portals">Student Portal</a>
```

---

## 📁 **File Structure**

### **Main Website (Static Export)**
```
out/                          # Static export directory
├── index.html               # Homepage
├── about/
│   └── index.html          # About page
├── academics/
│   └── index.html          # Academics page
├── admissions/
│   └── index.html          # Admissions page
├── news/
│   └── index.html          # News page
└── ...                     # Other static pages
```

### **Portal System (Render)**
```
src/app/portals/             # Portal-specific routes
├── page.tsx                # Portal login
├── admin/
│   └── page.tsx           # Admin dashboard
├── staff/
│   └── page.tsx           # Teacher dashboard
├── student/
│   └── page.tsx           # Student dashboard
├── parent/
│   └── page.tsx           # Parent dashboard
└── profile/
    └── page.tsx           # Universal profile

src/app/api/                 # API routes for portal
├── chatbot/
├── fees/
├── students/
├── teachers/
└── parents/
```

---

## 🚀 **Deployment Process**

### **Main Website Deployment**
```bash
# 1. Export static website
npm run export

# 2. Upload to current hosting platform
# Upload contents of 'out/' directory to josemariaschoolgh.org
```

### **Portal System Deployment**
```bash
# 1. Deploy portal-only to Render
git push origin main  # Auto-deploy to Render

# 2. Configure custom domain on Render
# Set portal.josemariaschoolgh.org as custom domain
```

---

## 🔧 **Configuration Files**

### **Static Export Configuration**
```javascript
// next.config.js (for main website)
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Exclude portal routes from static export
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    // Only include main website pages
    const pathMap = {};
    
    // Include main pages
    pathMap['/'] = { page: '/' };
    pathMap['/about'] = { page: '/about' };
    pathMap['/academics'] = { page: '/academics' };
    pathMap['/admissions'] = { page: '/admissions' };
    pathMap['/news'] = { page: '/news' };
    pathMap['/contact'] = { page: '/contact' };
    
    return pathMap;
  },
};
```

### **Portal Configuration**
```javascript
// next.portal.config.js (for Render)
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Portal-specific configuration
};
```

---

## 🎯 **Benefits of This Approach**

### **✅ Main Website Benefits**
- **Fast Loading**: Static files load instantly
- **Simple Hosting**: Works with any hosting provider
- **Cost Effective**: No server costs for static content
- **Reliable**: No server maintenance needed
- **SEO Friendly**: Static pages are easily indexed

### **✅ Portal System Benefits**
- **Dynamic Features**: Login, dashboards, real-time data
- **Database Integration**: User data, grades, fees
- **API Endpoints**: Backend functionality
- **Secure**: Authentication and authorization
- **Scalable**: Render handles scaling automatically

---

## 🔄 **User Experience Flow**

### **Website Visitors**
1. **Visit**: `josemariaschoolgh.org`
2. **Browse**: Static website content
3. **Portal Access**: Click portal links
4. **Redirect**: Go to `portal.josemariaschoolgh.org/portals`

### **Portal Users**
1. **Visit**: `portal.josemariaschoolgh.org/portals`
2. **Login**: Select portal type and authenticate
3. **Dashboard**: Access role-specific features
4. **Return**: Click back to main website if needed

---

## 🚨 **Migration Steps**

### **Phase 1: Prepare Static Export**
1. Configure `next.config.js` for static export
2. Test export locally
3. Upload to current hosting
4. Test main website functionality

### **Phase 2: Configure Portal**
1. Set up portal-only deployment on Render
2. Configure custom domain
3. Test portal functionality
4. Verify cross-domain links

### **Phase 3: Final Testing**
1. Test main website navigation
2. Test portal login and dashboards
3. Test cross-domain linking
4. Verify mobile responsiveness

---

## 🎉 **Expected Result**

### **🏠 Main Website (josemariaschoolgh.org)**
- Fast, static website
- All information pages working
- Portal links pointing to subdomain
- No server maintenance required

### **🔐 Portal System (portal.josemariaschoolgh.org)**
- Dynamic portal with authentication
- All dashboard features working
- API endpoints functional
- Secure and scalable

**This separation provides the best of both worlds!** 🎯✨
