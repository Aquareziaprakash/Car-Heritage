# Quick Fix: "Cannot connect to server" Error

## The Problem
After deploying to Vercel, you're seeing: "Cannot connect to server. Make sure the backend is running on port 5000."

This happens because the `NEXT_PUBLIC_API_URL` environment variable is not set.

## Quick Fix (5 minutes)

### Step 1: Get Your Backend URL
Make sure your backend is deployed and running. You should have a URL like:
- `https://car-heritage-api.vercel.app`
- `https://car-heritage-api.railway.app`
- `https://car-heritage-api.onrender.com`

### Step 2: Set Environment Variable in Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your frontend project**
3. **Go to**: Settings → Environment Variables
4. **Click**: "Add New"
5. **Fill in**:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: Your backend URL (e.g., `https://your-backend.vercel.app`)
   - **Environment**: Select all (Production, Preview, Development)
6. **Click**: "Save"
7. **Redeploy**: Go to Deployments tab → Click "..." on latest deployment → "Redeploy"

### Step 3: Verify
1. After redeploy, check browser console (F12)
2. Try logging in again
3. The error should be gone!

## Still Not Working?

### Check 1: Backend is Running
Test your backend URL directly:
```
https://your-backend.vercel.app/api/test
```
Should return: `{"message":"API is working!","timestamp":"..."}`

### Check 2: CORS is Configured
Your backend should allow your frontend domain. Check `backend/server.js` CORS settings.

### Check 3: Environment Variable is Set
In Vercel:
- Settings → Environment Variables
- Verify `NEXT_PUBLIC_API_URL` exists
- Value should be your backend URL (no trailing slash)

### Check 4: You Redeployed
Environment variables are baked in at build time. You MUST redeploy after adding/changing them.

## Alternative: Use Vercel CLI

If you prefer command line:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link to your project
cd frontend
vercel link

# Add environment variable
vercel env add NEXT_PUBLIC_API_URL production
# When prompted, enter your backend URL

# Redeploy
vercel --prod
```

## Need Help?

Check the browser console (F12) for detailed error messages. The new code will show:
- What API URL is being used
- Detailed connection errors
- Whether the environment variable is set


