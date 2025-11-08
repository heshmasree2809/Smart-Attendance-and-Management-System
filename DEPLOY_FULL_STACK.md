# 🚀 Deploy Full Stack SCAAMS (Frontend + Backend)

**Repository**: https://github.com/heshmasree2809/Smart-Attendance-Management-System.git

---

## 📋 What You Have

✅ **MongoDB Connection String**:
```
mongodb+srv://231fa04905_db_user:123abc@scaams.haf7n3c.mongodb.net/?appName=SCAAMS
```

✅ **JWT Secret**:
```
39a6be2d0c59cb3fbc8a542d813b83dad64bade90b9342b5d9b271ad83b5937dfedfef77dc7ca358061d4e81d7da760e05c41edf37d9b5232d99a5aaee46e41c
```

✅ **GitHub Repository**: Already pushed!

---

## 🎯 Deployment Plan

1. **Deploy Backend First** (Render) → Get API URL
2. **Deploy Frontend** (Vercel/Netlify) → Use Backend API URL
3. **Update Backend CORS** → Allow Frontend URL

---

# Part 1: Deploy Backend on Render

## Step 1: Go to Render
👉 https://dashboard.render.com

## Step 2: Create Web Service
- Click **"New +"** → **"Web Service"**
- Connect GitHub: `heshmasree2809/Smart-Attendance-Management-System`
- Click **"Connect"**

## Step 3: Configure Backend

```
Name: scaams-backend
Root Directory: backend
Environment: Node
Region: Singapore (or closest)
Branch: main
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

## Step 4: Add Environment Variables

Click **"Advanced"** → Add these 5 variables:

```
MONGO_URI = mongodb+srv://231fa04905_db_user:123abc@scaams.haf7n3c.mongodb.net/?appName=SCAAMS
JWT_SECRET = 39a6be2d0c59cb3fbc8a542d813b83dad64bade90b9342b5d9b271ad83b5937dfedfef77dc7ca358061d4e81d7da760e05c41edf37d9b5232d99a5aaee46e41c
CORS_ORIGIN = *
NODE_ENV = production
PORT = 5000
```

## Step 5: Deploy Backend
- Click **"Create Web Service"**
- Wait 2-3 minutes
- **Copy your backend URL**: `https://scaams-backend-xxxx.onrender.com`

---

# Part 2: Deploy Frontend on Vercel

## Step 1: Go to Vercel
👉 https://vercel.com/new

## Step 2: Import Repository
- Click **"Add New..."** → **"Project"**
- Import: `heshmasree2809/Smart-Attendance-Management-System`
- Click **"Import"**

## Step 3: Configure Frontend

```
Project Name: scaams-frontend
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

## Step 4: Add Environment Variable

Click **"Environment Variables"** → Add:

```
VITE_API_URL = https://your-backend-url.onrender.com/api
```

**Replace** `your-backend-url` with your actual Render backend URL from Part 1!

Example:
```
VITE_API_URL = https://scaams-backend-xxxx.onrender.com/api
```

## Step 5: Deploy Frontend
- Click **"Deploy"**
- Wait 1-2 minutes
- **Copy your frontend URL**: `https://scaams-frontend.vercel.app`

---

# Part 3: Update Backend CORS

## Go Back to Render Dashboard
1. Open your backend service on Render
2. Click **"Environment"** (left sidebar)
3. Find `CORS_ORIGIN` variable
4. Click **"Edit"**
5. Change from `*` to your Vercel frontend URL:
   ```
   https://scaams-frontend.vercel.app
   ```
6. Click **"Save Changes"**
7. Service will auto-redeploy (30 seconds)

---

# ✅ Testing Your Deployment

## Test Backend
```bash
curl https://your-backend.onrender.com/
```

Expected:
```json
{"message": "SCAAMS API is running"}
```

## Test Frontend
Open in browser:
```
https://scaams-frontend.vercel.app
```

Try to login/register and verify it connects to backend!

---

# 📝 Your Deployed URLs

After deployment, you'll have:

- **Backend API**: `https://scaams-backend-xxxx.onrender.com`
- **Frontend App**: `https://scaams-frontend.vercel.app`

---

# 🔥 Alternative: Deploy Frontend on Netlify

If you prefer Netlify instead of Vercel:

## Step 1: Go to Netlify
👉 https://app.netlify.com/start

## Step 2: Import Repository
- Click **"Add new site"** → **"Import an existing project"**
- Connect GitHub
- Select: `heshmasree2809/Smart-Attendance-Management-System`

## Step 3: Configure

```
Base directory: frontend
Build command: npm run build
Publish directory: frontend/dist
```

## Step 4: Environment Variables

Add in **"Site settings"** → **"Environment variables"**:

```
VITE_API_URL = https://your-backend-url.onrender.com/api
```

## Step 5: Deploy
- Click **"Deploy site"**
- Get your URL: `https://scaams-frontend.netlify.app`

---

# 🎊 You're Done!

Your full-stack application is now live:

✅ Backend deployed on Render  
✅ Frontend deployed on Vercel/Netlify  
✅ CORS configured  
✅ Environment variables set  

Share your app with users! 🚀

---

# 🔧 Troubleshooting

## Frontend can't connect to backend
- Verify `VITE_API_URL` is correct in Vercel/Netlify
- Check backend CORS_ORIGIN includes frontend URL
- Open browser console for error messages

## Backend not responding
- Check Render logs for errors
- Verify MongoDB connection string is correct
- Free tier sleeps after 15 min - first request takes 30-60s

## Build fails
- Check build logs in Vercel/Netlify or Render
- Verify all dependencies are in package.json
- Ensure Node version compatibility

---

**Need help?** Check deployment logs for detailed error messages!
