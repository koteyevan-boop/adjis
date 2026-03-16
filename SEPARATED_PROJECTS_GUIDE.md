# Separated Projects Guide

## 🎯 **Project Structure**

You now have two separate projects for independent development:

### **🏠 adjis-website (Static Website)**
- **Location**: `../adjis-website/`
- **Purpose**: Static website for josemariaschoolgh.org
- **Content**: Homepage, about, academics, admissions, news, etc.
- **Deployment**: Static export to hosting platform
- **Features**: No server functions, pure static content

### **🔐 adjis-portals (Portal System)**
- **Location**: `./adjis/` (current directory)
- **Purpose**: Dynamic portal system for portal.josemariaschoolgh.org
- **Content**: Login, dashboards, APIs, database functions
- **Deployment**: Render with server capabilities
- **Features**: Authentication, APIs, dynamic content

---

## 📁 **Project Files Structure**

### **adjis-website/ (Static)**
```
adjis-website/
├── src/app/
│   ├── page.tsx              # Homepage (boarding references removed)
│   ├── about/
│   │   └── page.tsx         # About page
│   ├── academics/
│   │   └── page.tsx         # Academics page
│   ├── admissions/
│   │   └── page.tsx         # Admissions page
│   ├── news/
│   │   └── page.tsx         # News page
│   └── contact/
│       └── page.tsx         # Contact page
├── next.config.js           # Static export configured
├── package.json             # Website-specific scripts
└── out/                     # Generated static files
```

### **adjis/ (Portal)**
```
adjis/
├── src/app/
│   ├── page.tsx              # Redirect to /portals
│   ├── portals/
│   │   ├── page.tsx         # Portal login
│   │   ├── admin/
│   │   ├── staff/
│   │   ├── student/
│   │   └── parent/
│   └── api/                  # All API routes
│       ├── chatbot/
│       ├── fees/
│       ├── students/
│       └── teachers/
├── next.config.js           # Dynamic configuration
├── package.json             # Portal-specific scripts
└── render.yaml              # Render deployment config
```

---

## 🚀 **Development Workflow**

### **Website Development (adjis-website)**
```bash
# Navigate to website project
cd ../adjis-website

# Start development server
npm run dev

# Make changes to website pages
# Edit src/app/page.tsx, src/app/about/page.tsx, etc.

# Build for production
npm run build

# Export static files
npm run export

# Deploy: Upload 'out/' folder to hosting
```

### **Portal Development (adjis)**
```bash
# Navigate to portal project (current directory)
cd ./adjis

# Start development server
npm run dev

# Make changes to portal features
# Edit src/app/portals/, src/app/api/, etc.

# Build for production
npm run build

# Deploy: Push to GitHub (auto-deploy to Render)
git push origin main
```

---

## 🔄 **Independent Editing**

### **Website Changes**
- **File Location**: `../adjis-website/src/app/`
- **No Impact**: Does not affect portal functionality
- **Deployment**: Static export to hosting platform
- **Testing**: `npm run dev` in website project

### **Portal Changes**
- **File Location**: `./adjis/src/app/portals/` and `./adjis/src/app/api/`
- **No Impact**: Does not affect website content
- **Deployment**: Auto-deploy to Render
- **Testing**: `npm run dev` in portal project

---

## 🌐 **Domain Configuration**

### **josemariaschoolgh.org (Website)**
```bash
# From adjis-website project
cd ../adjis-website
npm run export
# Upload contents of 'out/' folder to hosting
```

### **portal.josemariaschoolgh.org (Portal)**
```bash
# From adjis project
cd ./adjis
git add .
git commit -m "Update portal features"
git push origin main
# Auto-deploys to Render
```

---

## 🎨 **Cross-Project Links**

### **Website → Portal Links**
```html
<!-- In website project (adjis-website) -->
<a href="https://portal.josemariaschoolgh.org/portals">Parent Portal</a>
<a href="https://portal.josemariaschoolgh.org/portals">Staff Portal</a>
<a href="https://portal.josemariaschoolgh.org/portals">Student Portal</a>
```

### **Portal → Website Links**
```html
<!-- In portal project (adjis) -->
<a href="https://josemariaschoolgh.org">Back to Main Website</a>
```

---

## 📋 **Development Tasks**

### **Website Tasks (adjis-website)**
- ✅ Remove boarding school references
- ✅ Update navigation menu
- ✅ Add new pages or content
- ✅ Update styling and design
- ✅ Add news articles
- ✅ Update contact information

### **Portal Tasks (adjis)**
- ✅ Implement login system
- ✅ Create dashboards
- ✅ Add API endpoints
- ✅ Implement database features
- ✅ Add authentication
- ✅ Create user profiles

---

## 🔧 **Git Repositories**

### **Option 1: Separate Repositories**
```bash
# Website repository
cd ../adjis-website
git init
git add .
git commit -m "Initial website commit"
git remote add origin <website-repo-url>
git push -u origin main

# Portal repository (existing)
cd ./adjis
# Already connected to existing repository
```

### **Option 2: Same Repository (Different Branches)**
```bash
# Website branch
cd ../adjis-website
git checkout -b website
git add .
git commit -m "Website updates"
git push origin website

# Portal branch (main)
cd ./adjis
git checkout main
# Portal changes go here
```

---

## 🎯 **Benefits of Separation**

### **✅ Independent Development**
- **Website**: Edit without affecting portal
- **Portal**: Edit without affecting website
- **No Conflicts**: Separate codebases
- **Focused**: Each project has clear purpose

### **✅ Deployment Independence**
- **Website**: Deploy static files anytime
- **Portal**: Deploy server changes anytime
- **No Downtime**: One can be updated while other runs
- **Rollback**: Easy to rollback individual projects

### **✅ Team Collaboration**
- **Website Team**: Work on adjis-website
- **Portal Team**: Work on adjis
- **Specialization**: Different skills for each project
- **Clear Ownership**: Each team has clear responsibilities

---

## 🚨 **Important Notes**

### **Website Project (adjis-website)**
- **Static Only**: No server functions or APIs
- **No Portals**: Portal functionality removed
- **Export Required**: Must run `npm run export` before deployment
- **Fast Loading**: Optimized for static hosting

### **Portal Project (adjis)**
- **Dynamic Only**: Homepage redirects to /portals
- **Server Functions**: Full API and database capabilities
- **Render Deployment**: Requires server environment
- **Authentication**: Login and user management

---

## 🎉 **Ready to Use**

Both projects are now configured and ready for independent development:

1. **Website**: `cd ../adjis-website && npm run dev`
2. **Portal**: `cd ./adjis && npm run dev`

**You can now make separate edits for the website and portal without any conflicts!** 🎯✨
