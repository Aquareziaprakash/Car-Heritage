# Deployment Guide for Car Heritage

This guide covers deploying the Car Heritage application with frontend on Vercel and backend separately.

## Architecture

- **Frontend**: Next.js app deployed on Vercel
- **Backend**: Express.js API deployed separately (Vercel, Railway, Render, or Heroku)
- **Database**: MongoDB Atlas (recommended)

---

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

1. **Create `.env.local` file** in `frontend/` directory:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
```

2. **Build locally to test**:
```bash
cd frontend
npm run build
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
npm i -g vercel
cd frontend
vercel
```

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Set root directory to `frontend`
4. Add environment variable:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: Your backend URL
5. Deploy

### Step 3: Configure Environment Variables in Vercel

In Vercel Dashboard → Project Settings → Environment Variables:
- `NEXT_PUBLIC_API_URL` = Your backend API URL

---

## Backend Deployment Options

### Option 1: Deploy to Vercel (Serverless Functions)

Vercel supports Express.js through serverless functions.

1. **Create `vercel.json` in backend directory**:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ],
  "env": {
    "MONGODB_URI": "@mongodb-uri",
    "JWT_SECRET": "@jwt-secret",
    "PORT": "5000"
  }
}
```

2. **Deploy**:
```bash
cd backend
vercel
```

### Option 2: Deploy to Railway (Recommended for Express)

1. Go to [railway.app](https://railway.app)
2. Create new project
3. Deploy from GitHub or upload code
4. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT` (optional, defaults to 5000)
5. Railway will provide a public URL

### Option 3: Deploy to Render

1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect repository
4. Build command: `npm install`
5. Start command: `npm start`
6. Set environment variables

### Option 4: Deploy to Heroku

1. Install Heroku CLI
2. Login and create app:
```bash
heroku login
cd backend
heroku create your-app-name
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret
git push heroku main
```

---

## Database Setup (MongoDB Atlas)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all, or specific IPs)
5. Get connection string
6. Update `MONGODB_URI` in backend environment variables

---

## Configuration Checklist

### Frontend (.env.local or Vercel Environment Variables)
- [ ] `NEXT_PUBLIC_API_URL` - Backend API URL

### Backend (Environment Variables)
- [ ] `MONGODB_URI` - MongoDB connection string
- [ ] `JWT_SECRET` - Secure random string
- [ ] `PORT` - Server port (optional)

---

## Post-Deployment Steps

1. **Seed the database** (run once):
```bash
cd backend
node scripts/createAdmin.js
```

2. **Verify frontend can connect to backend**:
   - Check browser console for errors
   - Test admin login

3. **Update CORS in backend** (if needed):
   - Add frontend URL to allowed origins in `backend/server.js`

---

## Updating CORS for Production

In `backend/server.js`, update CORS configuration:

```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'https://your-frontend.vercel.app',
  credentials: true,
}

app.use(cors(corsOptions))
```

Or allow multiple origins:
```javascript
const allowedOrigins = [
  'https://your-frontend.vercel.app',
  'http://localhost:3000',
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}))
```

---

## Troubleshooting

### Frontend can't connect to backend
- Check `NEXT_PUBLIC_API_URL` is correct
- Verify backend is running and accessible
- Check CORS settings

### 404 errors on API routes
- Verify backend routes are working (test with Postman)
- Check API URL includes `/api` prefix

### Authentication fails
- Verify JWT_SECRET matches between environments
- Check token is being stored in localStorage

---

## Quick Reference URLs

After deployment, you'll have:
- Frontend: `https://car-heritage.vercel.app`
- Backend: `https://car-heritage-api.vercel.app` (or your backend URL)
- Admin Panel: `https://car-heritage.vercel.app/admin`

