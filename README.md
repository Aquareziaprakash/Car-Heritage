# Car Heritage - Premium Automobile Services Website

A fully functional, modern, and highly engaging business website for Car Heritage, a premium automobile services company.

## Features

- 🚗 **Premium Car Services**: Car washing, detailing, denting, painting, and full custom modifications
- 🛍️ **Product Store**: Complete e-commerce section for car accessories, tools, and care products
- ☕ **Café & Parking**: Information about parking facilities and café services
- ⭐ **Customer Reviews**: Review system with ratings and approval workflow
- 👥 **Staff Directory**: Categorized staff listing (Board Members, Managers, Technicians, Workers)
- 📖 **About Page**: Company history, mission, vision, values, and owner information
- 🔐 **Admin Panel**: Secure admin dashboard with full CRUD operations
- 📱 **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop devices

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **React Icons** - Icon library
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## Project Structure

```
Car Heritage/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # Next.js app directory
│   │   ├── about/          # About page
│   │   ├── admin/          # Admin panel
│   │   ├── contact/        # Contact page
│   │   ├── products/       # Products page
│   │   ├── reviews/        # Reviews page
│   │   ├── services/       # Services page
│   │   ├── staff/          # Staff page
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── admin/          # Admin components
│   │   ├── Navbar.tsx      # Navigation bar
│   │   ├── Hero.tsx        # Hero section
│   │   ├── Footer.tsx      # Footer component
│   │   └── ReviewsPreview.tsx
│   └── package.json
├── backend/                 # Express backend API
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/        # Express middleware
│   ├── scripts/            # Utility scripts
│   └── server.js           # Express server
└── package.json            # Root package.json
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## Installation & Setup

### 1. Clone or Navigate to the Project

```bash
cd "Car Heritage"
```

### 2. Install Dependencies

Install dependencies for root, frontend, and backend:

```bash
npm run install:all
```

Or install manually:

```bash
# Root dependencies
npm install

# Frontend dependencies
cd frontend
npm install

# Backend dependencies
cd ../backend
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
```

Create `.env` file with the following content:

```env
MONGODB_URI=mongodb://localhost:27017/carheritage
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/carheritage
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
```

### 4. Start MongoDB

**Local MongoDB:**
```bash
# On Windows
net start MongoDB

# On macOS/Linux
mongod
```

**Or use MongoDB Atlas** (cloud) - no local installation needed.

### 5. Seed the Database

Run the seed script to populate the database with sample data:

```bash
cd backend
node scripts/seed.js
```

This will create:
- Admin user (username: `admin`, password: `admin123`)
- Sample products
- Sample services
- Sample staff members
- Sample reviews
- About page content

### 6. Start the Development Servers

From the root directory, run:

```bash
npm run dev
```

This will start both frontend and backend servers concurrently.

**Or start them separately:**

```bash
# Terminal 1 - Backend (port 5000)
cd backend
npm run dev

# Terminal 2 - Frontend (port 3000)
cd frontend
npm run dev
```

### 7. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:3000/admin
  - Username: `admin`
  - Password: `admin123`

## Admin Panel Features

The admin panel provides full CRUD operations for:

1. **Products Management**
   - Add, edit, delete products
   - Set prices, categories, stock status
   - Upload product images

2. **Services Management**
   - Add, edit, delete services
   - Add service descriptions, videos, and images

3. **Staff Management**
   - Add, edit, delete staff members
   - Categorize by role (Board Member, Manager, Technician, Worker)
   - Add photos and descriptions

4. **Reviews Management**
   - Approve or delete customer reviews
   - View pending reviews
   - Filter by approval status

5. **About Page Management**
   - Update company history, mission, vision, values
   - Add certificate image
   - Update owner information and photo

6. **Dashboard**
   - View statistics (total products, services, staff, pending reviews)

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register new admin (for initial setup)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service (Admin only)
- `PUT /api/services/:id` - Update service (Admin only)
- `DELETE /api/services/:id` - Delete service (Admin only)

### Staff
- `GET /api/staff` - Get all staff
- `GET /api/staff/:id` - Get single staff member
- `POST /api/staff` - Create staff (Admin only)
- `PUT /api/staff/:id` - Update staff (Admin only)
- `DELETE /api/staff/:id` - Delete staff (Admin only)

### Reviews
- `GET /api/reviews` - Get all approved reviews
- `GET /api/reviews/stats/average` - Get average rating
- `POST /api/reviews` - Create review (Public)
- `PUT /api/reviews/:id` - Update review (Admin only)
- `DELETE /api/reviews/:id` - Delete review (Admin only)

### About
- `GET /api/about` - Get about information
- `PUT /api/about` - Update about information (Admin only)

## Production Deployment

### Frontend (Vercel/Netlify)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy to Vercel:
```bash
npm i -g vercel
vercel
```

### Backend (Heroku/Railway/Render)

1. Set environment variables in your hosting platform
2. Deploy the backend folder
3. Update frontend API URLs to point to production backend

### Database

- Use MongoDB Atlas for cloud database
- Update `MONGODB_URI` in production environment variables

## Customization

### Colors

Edit `frontend/tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: {
    dark: '#0a0a0a',
    gray: '#1a1a1a',
    red: '#dc2626',
    'red-dark': '#991b1b',
    metallic: '#2d2d2d',
  },
}
```

### Content

All content can be managed through the admin panel after logging in.

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running locally, or
- Use MongoDB Atlas and update `MONGODB_URI` in `.env`

### Port Already in Use

- Change `PORT` in backend `.env` file
- Update frontend API calls to use the new port

### CORS Issues

- CORS is enabled for all origins in development
- For production, update CORS settings in `backend/server.js`

## License

This project is created for Car Heritage business use.

## Support

For issues or questions, please contact the development team.

---

**Built with ❤️ for Car Heritage**




