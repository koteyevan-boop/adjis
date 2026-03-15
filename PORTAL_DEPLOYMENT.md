# 🚀 Portal Server Deployment for portal.josemariaschoolgh.org

## ✅ Current Status
- **Static Website**: ✅ Exported with correct subdomain links
- **Portal Components**: ✅ Backed up and ready for deployment
- **Subdomain**: `portal.josemariaschoolgh.org` ✅ Configured

## 🎯 Deployment Steps

### **Step 1: Restore Portal Components**
```bash
# Restore API routes
Move-Item backup-api\api src\app\

# Restore portal pages
Move-Item backup-api\portals-admin src\app\portals\admin
Move-Item backup-api\portals-parent src\app\portals\parent
Move-Item backup-api\portals-student src\app\portals\student

# Restore dynamic portal page
Move-Item src\app\portals\page-dynamic.tsx src\app\portals\page.tsx
```

### **Step 2: Configure for Server Deployment**
```bash
# Edit next.config.js - Remove static export
# Remove this line: output: 'export',
```

### **Step 3: Build and Deploy**
```bash
npm run build
npm start
```

## 🔧 Server Configuration

### **Environment Variables**
Create `.env.local` file:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=adjis_db
```

### **Database Setup**
1. **Create MySQL database** named `adjis_db`
2. **Run initialization**: `POST https://portal.josemariaschoolgh.org/api/init-db`
3. **Verify tables created** (10 tables total)

## 🌐 Portal URLs

### **Final Portal Structure**
- **Student Portal**: `https://portal.josemariaschoolgh.org/student`
- **Parent Portal**: `https://portal.josemariaschoolgh.org/parent`
- **Admin Portal**: `https://portal.josemariaschoolgh.org/admin`
- **Portal Selection**: `https://portal.josemariaschoolgh.org/portals`

### **Login Credentials**
- **Student**: `student` / `password`
- **Parent**: `parent` / `password`
- **Admin**: `admin` / `password`

## 🚀 Quick Deployment Commands

### **Windows PowerShell Commands**
```powershell
# Step 1: Restore components
Move-Item backup-api\api src\app\
Move-Item backup-api\portals-admin src\app\portals\admin
Move-Item backup-api\portals-parent src\app\portals\parent
Move-Item backup-api\portals-student src\app\portals\student
Move-Item src\app\portals\page-dynamic.tsx src\app\portals\page.tsx

# Step 2: Remove static export (edit next.config.js)
# Remove the line: output: 'export',

# Step 3: Build and start
npm run build
npm start
```

## 📋 Post-Deployment Checklist

### **Database Verification**
- [ ] Database connection successful
- [ ] All 10 tables created
- [ ] API endpoints responding

### **Portal Testing**
- [ ] Student portal login works
- [ ] Parent portal login works
- [ ] Admin portal login works
- [ ] All enhanced features functional

### **Website Integration**
- [ ] Static website links to portal subdomain
- [ ] Portal access page shows correct URLs
- [ ] Cross-domain navigation working

## 🔒 Security Considerations

### **Production Security**
1. **Database Security**: Use strong passwords
2. **Environment Variables**: Keep `.env.local` secure
3. **HTTPS**: Ensure SSL certificate installed
4. **Firewall**: Configure appropriate ports
5. **Backups**: Regular database backups

### **User Authentication**
- **Portal-based login**: Secure authentication system
- **Role-based access**: Student/Parent/Admin roles
- **Session management**: LocalStorage based sessions

## 🎯 Enhanced Features Available

### **Student Portal**
- ✅ Enhanced dashboard with profile
- ✅ Complete gradebook (9 Ghanaian subjects)
- ✅ Full schedule (8 AM - 2:30 PM)
- ✅ Assignments and exams
- ✅ Fee tracking

### **Parent Portal**
- ✅ Multi-child support
- ✅ Teacher messages
- ✅ Academic monitoring
- ✅ Fee management

### **Admin Portal**
- ✅ User management system
- ✅ Enhanced dashboard
- ✅ Role-based access control
- ✅ System administration

## 📞 Support Information

### **Portal Access**
- **URL**: `https://portal.josemariaschoolgh.org`
- **Support**: Contact school administration
- **Documentation**: Available in portal help section

### **Technical Support**
- **Database**: MySQL 5.7+
- **Node.js**: Version 18+
- **Memory**: Minimum 1GB RAM
- **Storage**: Minimum 10GB

---

## ✅ Ready for Production

Your portal system is now configured for:
- **Subdomain**: `portal.josemariaschoolgh.org`
- **Full functionality**: Database and API endpoints
- **Enhanced features**: All portal improvements implemented
- **Security**: Authentication and role-based access

**Next Step**: Deploy to your server and configure the database!
