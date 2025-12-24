# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm run install:all
```

### Step 2: Set Up Backend Environment
Create `backend/.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/carheritage
JWT_SECRET=your-secret-key-here
PORT=5000
```

### Step 3: Start MongoDB
- **Local**: Make sure MongoDB is running
- **Cloud**: Use MongoDB Atlas and update `MONGODB_URI` in `.env`

### Step 4: Seed the Database
```bash
cd backend
node scripts/seed.js
```

This creates:
- Admin user: `admin` / `admin123`
- Sample products, services, staff, and reviews

### Step 5: Start the Application
From root directory:
```bash
npm run dev
```

Or separately:
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

### Step 6: Access the Application
- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
  - Username: `admin`
  - Password: `admin123`

## 📝 Notes

- Frontend runs on port **3000**
- Backend runs on port **5000**
- Make sure MongoDB is running before starting the backend
- All API endpoints are prefixed with `/api`

## 🎨 Features

✅ Home page with hero section  
✅ About page with company info  
✅ Staff directory  
✅ Services showcase  
✅ Products store  
✅ Customer reviews  
✅ Contact page  
✅ Admin panel with full CRUD  

Enjoy! 🎉



