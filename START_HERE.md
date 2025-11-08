# 🚀 START HERE - Deploy SCAAMS

## What You're Deploying

✅ **Backend** (Node.js + Express + MongoDB) → Render  
✅ **Frontend** (React + Vite) → Vercel

---

## 📋 Before You Start

You already have:
- ✅ Code pushed to GitHub
- ✅ MongoDB connection string
- ✅ JWT secret generated

---

## 🎯 Deployment Steps (10 minutes)

### 1️⃣ Deploy Backend (5 minutes)

**Go to**: https://dashboard.render.com

1. New + → Web Service
2. Connect: `heshmasree2809/Smart-Attendance-Management-System`
3. Settings:
   - Name: `scaams-backend`
   - Root: `backend`
   - Build: `npm install`
   - Start: `npm start`
4. Add 5 environment variables (see below)
5. Deploy!
6. **SAVE YOUR BACKEND URL**: `https://scaams-backend-xxxx.onrender.com`

**Environment Variables for Backend:**
```
MONGO_URI = mongodb+srv://231fa04905_db_user:123abc@scaams.haf7n3c.mongodb.net/?appName=SCAAMS
JWT_SECRET = 39a6be2d0c59cb3fbc8a542d813b83dad64bade90b9342b5d9b271ad83b5937dfedfef77dc7ca358061d4e81d7da760e05c41edf37d9b5232d99a5aaee46e41c
CORS_ORIGIN = *
NODE_ENV = production
PORT = 5000
```

---

### 2️⃣ Deploy Frontend (3 minutes)

**Go to**: https://vercel.com/new

1. Import: `heshmasree2809/Smart-Attendance-Management-System`
2. Settings:
   - Name: `scaams-frontend`
   - Framework: `Vite`
   - Root: `frontend`
   - Build: `npm run build`
   - Output: `dist`
3. Add 1 environment variable:
   ```
   VITE_API_URL = https://YOUR-BACKEND-URL.onrender.com/api
   ```
   ⚠️ Use your actual backend URL from step 1!
4. Deploy!
5. **SAVE YOUR FRONTEND URL**: `https://scaams-frontend.vercel.app`

---

### 3️⃣ Update CORS (2 minutes)

1. Go back to Render
2. Open your backend service
3. Environment → Edit `CORS_ORIGIN`
4. Change from `*` to your frontend URL:
   ```
   https://scaams-frontend.vercel.app
   ```
5. Save (auto-redeploys)

---

## ✅ Test Your App

1. Open your frontend URL in browser
2. Try to register/login
3. Check if everything works!

---

## 📚 Detailed Guides

- **Quick Guide**: [QUICK_DEPLOY_BOTH.md](./QUICK_DEPLOY_BOTH.md)
- **Full Guide**: [DEPLOY_FULL_STACK.md](./DEPLOY_FULL_STACK.md)
- **Checklist**: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

---

## 🆘 Need Help?

### Backend not working?
- Check Render logs
- Verify MongoDB connection string
- Wait 30-60s (free tier sleeps)

### Frontend not connecting?
- Check `VITE_API_URL` in Vercel
- Verify backend CORS_ORIGIN
- Open browser console for errors

### Still stuck?
- Check deployment logs
- Verify all environment variables
- Make sure URLs don't have trailing slashes

---

## 🎉 That's It!

Your full-stack app should now be live!

**Backend**: `https://your-backend.onrender.com`  
**Frontend**: `https://your-frontend.vercel.app`

Share it with your users! 🚀
