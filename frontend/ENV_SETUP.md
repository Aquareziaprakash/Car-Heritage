# Environment Variable Setup Guide

## Problem
If you're seeing "Cannot connect to server" errors after deployment, it means the `NEXT_PUBLIC_API_URL` environment variable is not set.

## Solution

### For Vercel Deployment

1. **Go to your Vercel project dashboard**
2. **Navigate to**: Settings → Environment Variables
3. **Add a new environment variable**:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: Your backend API URL (e.g., `https://your-backend.vercel.app` or `https://your-backend.railway.app`)
   - **Environment**: Production, Preview, and Development (or just Production if you only want it there)

4. **Redeploy your application** after adding the variable

### For Other Platforms

#### Netlify
1. Site settings → Build & deploy → Environment
2. Add `NEXT_PUBLIC_API_URL` = your backend URL
3. Redeploy

#### Railway/Render/Other
1. Project settings → Environment Variables
2. Add `NEXT_PUBLIC_API_URL` = your backend URL
3. Redeploy

## Local Development

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Verify Setup

After setting the environment variable, you can verify it's working by:

1. Checking the browser console for the API Base URL log
2. Inspecting network requests - they should point to your backend URL, not localhost:5000

## Important Notes

- `NEXT_PUBLIC_` prefix is required for Next.js to expose the variable to the browser
- Environment variables must be set BEFORE building/deploying
- If you change environment variables, you need to redeploy
- The variable is baked into the build at build time

## Troubleshooting

### Still seeing localhost:5000 in production?
- Make sure you've set `NEXT_PUBLIC_API_URL` in your deployment platform
- Redeploy after setting the variable
- Clear browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Getting CORS errors?
- Make sure your backend CORS settings allow your frontend domain
- Check the backend server logs for CORS-related errors

### Connection timeout?
- Verify your backend URL is correct and accessible
- Check if the backend is running and healthy
- Test the backend URL directly in a browser or with curl

