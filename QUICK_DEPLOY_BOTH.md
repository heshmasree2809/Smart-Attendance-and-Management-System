# 🚀 Quick Deploy Guide - Frontend + Backend

## Your Info

- **GitHub**: https://github.com/heshmasree2809/Smart-Attendance-Management-System.git
- **MongoDB**: `mongodb+srv://231fa04905_db_user:123abc@scaams.haf7n3c.mongodb.net/?appName=SCAAMS`
- **JWT Secret**: `39a6be2d0c59cb3fbc8a542d813b83dad64bade90b9342b5d9b271ad83b5937dfedfef77dc7ca358061d4e81d7da760e05c41edf37d9b5232d99a5aaee46e41c`

---

## 🎯 Step 1: Deploy Backend (Render)

1. Go to: **https://dashboard.render.com**
2. New + → Web Service
3. Connect: `heshmasree2809/Smart-Attendance-Management-System`
4. Configure:
   - Name: `scaams-backend`
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
5. Add Environment Variables:
   ```
   MONGO_URI = mongodb+srv://231fa04905_db_user:123abc@scaams.haf7n3c.mongodb.net/?appName=SCAAMS
   JWT_SECRET = 39a6be2d0c59cb3fbc8a542d813b83dad64bade90b9342b5d9b271ad83b5937dfedfef77dc7ca358061d4e81d7da760e05c41edf37d9b5232d99a5aaee46e41c
   CORS_ORIGIN = *
   NODE_ENV = production
   PORT = 5000
   ```
6. Deploy!
7. **📝 Copy your backend URL**: `https://scaams-backend-xxxx.onrender.com`

---

## 🎨 Step 2: Deploy Frontend (Vercel)

1. Go to: **https://vercel.com/new**
2. Import: `heshmasree2809/Smart-Attendance-Management-System`
3. Configure:
   - Name: `scaams-frontend`
   - Framework: `Vite`
   - Root Directory: `frontend`
   - Build: `npm run build`
   - Output: `dist`
4. Add Environment Variable:
   ```
   VITE_API_URL = https://YOUR-BACKEND-URL.onrender.com/api
   ```
   ⚠️ **Replace with your actual backend URL from Step 1!**
5. Deploy!
6. **📝 Copy your frontend URL**: `https://scaams-frontend.vercel.app`

---

## 🔗 Step 3: Update Backend CORS

1. Go back to Render dashboard
2. Open your backend service
3. Environment → Edit `CORS_ORIGIN`
4. Change from `*` to your frontend URL:
   ```
   https://scaams-frontend.vercel.app
   ```
5. Save (auto-redeploys)

---

## ✅ Done!

Your app is live:
- **Backend**: `https://scaams-backend-xxxx.onrender.com`
- **Frontend**: `https://scaams-frontend.vercel.app`

Test it by opening the frontend URL in your browser!

---

## 🔄 Alternative: Use Netlify for Frontend

If you prefer Netlify:

1. Go to: **https://app.netlify.com/start**
2. Import project from GitHub
3. Configure:
   - Base: `frontend`
   - Build: `npm run build`
   - Publish: `frontend/dist`
4. Add env var: `VITE_API_URL = https://your-backend.onrender.com/api`
5. Deploy!

---

## 🐛 Quick Fixes

| Problem | Solution |
|---------|----------|
| Frontend can't connect | Check VITE_API_URL in Vercel |
| CORS error | Update CORS_ORIGIN in Render |
| Backend slow | Normal - free tier sleeps |
| Build fails | Check logs in dashboard |

---

**Full guide**: See [DEPLOY_FULL_STACK.md](./DEPLOY_FULL_STACK.md)
