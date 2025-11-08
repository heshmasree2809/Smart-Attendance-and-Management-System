# ✅ Full Stack Deployment Checklist

## Pre-Deployment
- [x] Code pushed to GitHub
- [x] MongoDB Atlas connection string ready
- [x] JWT secret generated
- [ ] Ready to deploy!

---

## 🔴 BACKEND DEPLOYMENT (Render)

### Step 1: Create Service
- [ ] Go to https://dashboard.render.com
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repository
- [ ] Select: `heshmasree2809/Smart-Attendance-Management-System`

### Step 2: Configure
- [ ] **Name**: `scaams-backend`
- [ ] **Root Directory**: `backend`
- [ ] **Environment**: `Node`
- [ ] **Build Command**: `npm install`
- [ ] **Start Command**: `npm start`
- [ ] **Instance Type**: `Free`

### Step 3: Environment Variables
- [ ] `MONGO_URI` = `mongodb+srv://231fa04905_db_user:123abc@scaams.haf7n3c.mongodb.net/?appName=SCAAMS`
- [ ] `JWT_SECRET` = `39a6be2d0c59cb3fbc8a542d813b83dad64bade90b9342b5d9b271ad83b5937dfedfef77dc7ca358061d4e81d7da760e05c41edf37d9b5232d99a5aaee46e41c`
- [ ] `CORS_ORIGIN` = `*`
- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `5000`

### Step 4: Deploy & Test
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (2-3 minutes)
- [ ] Copy backend URL: `https://__________________.onrender.com`
- [ ] Test: Open URL in browser, should see: `{"message": "SCAAMS API is running"}`

---

## 🔵 FRONTEND DEPLOYMENT (Vercel)

### Step 1: Create Project
- [ ] Go to https://vercel.com/new
- [ ] Click "Add New..." → "Project"
- [ ] Import: `heshmasree2809/Smart-Attendance-Management-System`

### Step 2: Configure
- [ ] **Project Name**: `scaams-frontend`
- [ ] **Framework Preset**: `Vite`
- [ ] **Root Directory**: `frontend`
- [ ] **Build Command**: `npm run build`
- [ ] **Output Directory**: `dist`
- [ ] **Install Command**: `npm install`

### Step 3: Environment Variable
- [ ] Add `VITE_API_URL` = `https://YOUR-BACKEND-URL.onrender.com/api`
  - Replace with actual backend URL from above!

### Step 4: Deploy & Test
- [ ] Click "Deploy"
- [ ] Wait for deployment (1-2 minutes)
- [ ] Copy frontend URL: `https://__________________.vercel.app`
- [ ] Test: Open URL in browser

---

## 🟢 FINAL CONFIGURATION

### Update Backend CORS
- [ ] Go back to Render dashboard
- [ ] Open backend service
- [ ] Click "Environment" (left sidebar)
- [ ] Edit `CORS_ORIGIN` variable
- [ ] Change from `*` to your Vercel frontend URL
- [ ] Save changes (auto-redeploys in 30 seconds)

### Final Testing
- [ ] Open frontend URL
- [ ] Try to register a new user
- [ ] Try to login
- [ ] Check if data loads correctly
- [ ] Test all major features

---

## 📝 Your Deployed URLs

Write them here for reference:

**Backend API**: `https://________________________________`

**Frontend App**: `https://________________________________`

---

## 🎉 Deployment Complete!

Share your app with users!

---

## 🔧 If Something Goes Wrong

### Backend Issues
- Check Render logs for errors
- Verify MongoDB connection string
- Ensure all environment variables are set

### Frontend Issues
- Check Vercel deployment logs
- Verify VITE_API_URL is correct
- Open browser console for errors

### Connection Issues
- Verify CORS_ORIGIN matches frontend URL exactly
- Check if backend is awake (free tier sleeps)
- Test backend URL directly in browser

---

**Need detailed instructions?** See [DEPLOY_FULL_STACK.md](./DEPLOY_FULL_STACK.md)
