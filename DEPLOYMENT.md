# 🚀 PickFlick Deployment Guide

This guide will help you deploy PickFlick to production:

- **Backend**: Render (Free)
- **Frontend**: Vercel (Free)
- **Database**: MongoDB Atlas (Free)

## 📋 Prerequisites

1. **GitHub Account**: Push your code to GitHub
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
4. **MongoDB Atlas Account**: Sign up at [mongodb.com/atlas](https://mongodb.com/atlas)
5. **TMDB API Key**: Get free API key from [themoviedb.org](https://themoviedb.org)

## 🗄️ Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://mongodb.com/atlas)
2. Create a new cluster (free tier)
3. Create a database user
4. Whitelist IP addresses (0.0.0.0/0 for all IPs)
5. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/pickflick`)

## 🔧 Step 2: Get TMDB API Key

1. Go to [themoviedb.org](https://themoviedb.org)
2. Sign up for a free account
3. Go to Settings > API
4. Request an API key (free)
5. Copy your API key

## 🖥️ Step 3: Deploy Backend to Render

### 3.1 Push to GitHub

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 3.2 Deploy on Render

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `pickflick-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`

### 3.3 Environment Variables

Add these environment variables in Render:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pickflick
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_API_KEY=your_tmdb_api_key_here
NODE_ENV=production
```

### 3.4 Deploy

Click "Create Web Service" and wait for deployment.

## 🌐 Step 4: Deploy Frontend to Vercel

### 4.1 Update API URL

After backend deployment, update the frontend API URL:

1. Go to your Render dashboard
2. Copy your backend URL (e.g., `https://pickflick-backend.onrender.com`)
3. Update `frontend/src/utils/constants.js`:

```javascript
API_BASE_URL: "https://your-backend-url.onrender.com/api";
```

### 4.2 Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 4.3 Environment Variables (Optional)

If you want to use environment variables:

```
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

### 4.4 Deploy

Click "Deploy" and wait for deployment.

## ✅ Step 5: Test Your Deployment

1. **Backend Health Check**: Visit `https://your-backend-url.onrender.com/api/health`
2. **Frontend**: Visit your Vercel URL
3. **Full Flow**: Create a session, add movies, and test the shuffle

## 🔧 Troubleshooting

### Backend Issues

- Check Render logs for errors
- Verify environment variables are set correctly
- Ensure MongoDB connection string is correct

### Frontend Issues

- Check Vercel build logs
- Verify API URL is correct
- Check browser console for CORS errors

### CORS Issues

If you get CORS errors, update `backend/server.js`:

```javascript
app.use(
  cors({
    origin: ["https://your-frontend-url.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);
```

## 📝 Environment Variables Summary

### Backend (.env)

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pickflick
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_API_KEY=your_tmdb_api_key_here
NODE_ENV=production
```

### Frontend (.env)

```
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

## 🎉 You're Done!

Your PickFlick app should now be live and accessible to users worldwide!

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **API Health**: `https://your-backend.onrender.com/api/health`
