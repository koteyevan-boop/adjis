# Vercel Deployment Troubleshooting Guide

## Issue: Updates Not Reflecting on Vercel

### Common Causes and Solutions

#### 1. Build Configuration Issues
**Problem**: Vercel build fails or uses incorrect build settings
**Solution**: Updated `vercel.json` with proper configuration
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "functions": {
    "src/app/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "env": {
    "NODE_ENV": "production"
  }
}
```

#### 2. Server-Side Rendering (SSR) Issues
**Problem**: localStorage not available during server-side rendering
**Solution**: Added safe localStorage helpers in PortalGuard
```typescript
const getLocalStorage = (key: string, defaultValue: string = '') => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key) || defaultValue;
  }
  return defaultValue;
};
```

#### 3. Environment Variables
**Problem**: Development vs Production environment differences
**Solution**: Proper environment handling in PortalGuard
```typescript
const isDevMode = process.env.NODE_ENV === 'development';
if (isDevMode) {
  setIsAuthenticated(true); // Auto-authenticate in dev
} else {
  setIsAuthenticated(authStatus === 'true'); // Check auth in prod
}
```

### Steps to Fix Vercel Deployment

#### 1. Clear Vercel Cache
1. Go to Vercel dashboard
2. Select your project
3. Click "Settings" → "Functions"
4. Click "Clear Cache"
5. Redeploy

#### 2. Force Redeployment
1. Push a small change to trigger redeploy
2. Or use Vercel CLI: `vercel --prod`
3. Or use GitHub Actions to trigger deploy

#### 3. Check Build Logs
1. Go to Vercel dashboard
2. Select your project
3. Click "Deployments"
4. Check the latest deployment logs for errors

#### 4. Verify Environment Variables
1. Go to Vercel dashboard
2. Select your project
3. Click "Settings" → "Environment Variables"
4. Ensure all required variables are set

### Common Vercel Error Messages

#### "Build failed" Error
- **Cause**: TypeScript errors or missing dependencies
- **Solution**: Run `npm run build` locally to fix errors

#### "Function invocation timed out" Error
- **Cause**: API functions taking too long to respond
- **Solution**: Optimize API functions or increase timeout

#### "Page not found" Error
- **Cause**: Incorrect routing or missing pages
- **Solution**: Verify file structure in `app/` directory

### Deployment Checklist

#### Before Deployment
- [ ] Run `npm run build` successfully
- [ ] Test all portal pages locally
- [ ] Check for TypeScript errors
- [ ] Verify environment variables
- [ ] Update `vercel.json` if needed

#### After Deployment
- [ ] Check deployment logs
- [ ] Test all portal pages on Vercel
- [ ] Verify authentication works
- [ ] Check API endpoints
- [ ] Test mobile responsiveness

### Specific Portal Issues

#### Admin Portal Not Loading
**Symptoms**: Blank page or error on `/portals/admin`
**Causes**: 
- PortalGuard localStorage issues
- ModernAdminDashboard import errors
- Authentication bypass not working in production

**Solutions**:
1. Updated PortalGuard with safe localStorage
2. Fixed ModernAdminDashboard imports
3. Added proper environment handling

#### Teacher Portal Not Loading
**Symptoms**: Blank page or error on `/portals/staff`
**Causes**: 
- Missing component imports
- Authentication issues
- Mobile optimization conflicts

**Solutions**:
1. Verify all imports in TeacherPortal
2. Check ComprehensiveDashboard imports
3. Test authentication flow

#### Student/Parent Portals Not Loading
**Symptoms**: Blank page or error on `/portals/student` or `/portals/parent`
**Causes**: 
- PortalGuard authentication
- Missing components
- Routing issues

**Solutions**:
1. Check PortalGuard logic
2. Verify component imports
3. Test routing structure

### Performance Optimization

#### Build Optimization
- Use `next build` instead of `next export` for dynamic routes
- Optimize images and assets
- Minimize bundle size

#### Runtime Optimization
- Implement proper caching
- Use Vercel Edge Functions for API routes
- Optimize database queries

### Monitoring and Debugging

#### Vercel Analytics
1. Enable Vercel Analytics
2. Monitor page load times
3. Track error rates
4. Analyze user behavior

#### Logging
1. Implement proper logging
2. Use Vercel Logs for debugging
3. Monitor API response times
4. Track authentication failures

### Emergency Fixes

#### Quick Rollback
1. Go to Vercel dashboard
2. Select previous successful deployment
3. Click "Promote to Production"

#### Hot Fix Deployment
1. Make urgent changes locally
2. Commit and push to main branch
3. Vercel will auto-deploy

### Best Practices

#### Development Workflow
1. Test changes locally first
2. Use feature branches
3. Run build before pushing
4. Monitor deployment after push

#### Production Monitoring
1. Set up alerts for build failures
2. Monitor error rates
3. Track performance metrics
4. Regular backup and updates

### Contact Support

If issues persist:
1. Check Vercel status page
2. Review Vercel documentation
3. Contact Vercel support
4. Check GitHub Issues for known problems

---

## Recent Fixes Applied

### 1. Updated vercel.json
- Added proper build configuration
- Set correct Node.js runtime
- Added environment variables

### 2. Fixed PortalGuard SSR Issues
- Added safe localStorage helpers
- Proper environment detection
- Server-side rendering compatibility

### 3. Component Import Fixes
- Fixed ModernAdminDashboard imports
- Updated AdminPortal structure
- Resolved TypeScript errors

### 4. Build Optimization
- Verified local build success
- Optimized component structure
- Removed unused dependencies

The deployment should now work correctly on Vercel with all recent updates reflecting properly.
