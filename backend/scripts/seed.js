const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config()

// Models
const User = require('../models/User')
const Product = require('../models/Product')
const Service = require('../models/Service')
const Staff = require('../models/Staff')
const Review = require('../models/Review')
const About = require('../models/About')

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/carheritage'
    )
    console.log('Connected to MongoDB')

    // Clear existing data
    await User.deleteMany({})
    await Product.deleteMany({})
    await Service.deleteMany({})
    await Staff.deleteMany({})
    await Review.deleteMany({})
    await About.deleteMany({})

    // Create admin user
    const existingAdmin = await User.findOne({ username: 'admin' })
    if (existingAdmin) {
      existingAdmin.password = 'admin123'
      await existingAdmin.save()
      console.log('Admin user updated (username: admin, password: admin123)')
    } else {
      const admin = new User({
        username: 'admin',
        password: 'admin123',
      })
      await admin.save()
      console.log('Admin user created (username: admin, password: admin123)')
    }

    // Create products
    const products = [
      {
        name: 'Premium Car Wax',
        description: 'High-quality car wax for a glossy finish that lasts for months.',
        price: 29.99,
        category: 'care-products',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        inStock: true,
      },
      {
        name: 'Car Vacuum Cleaner',
        description: 'Powerful portable vacuum cleaner for car interiors.',
        price: 79.99,
        category: 'tools',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
        inStock: true,
      },
      {
        name: 'Leather Conditioner',
        description: 'Premium leather conditioner to keep your seats soft and protected.',
        price: 24.99,
        category: 'care-products',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
        inStock: true,
      },
      {
        name: 'Car Phone Mount',
        description: 'Sturdy phone mount for safe navigation while driving.',
        price: 19.99,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        inStock: true,
      },
      {
        name: 'Tire Shine Spray',
        description: 'Professional tire shine spray for that showroom look.',
        price: 14.99,
        category: 'care-products',
        image: 'https://images.unsplash.com/photo-1552519507-88aa2dfa9fdb?w=400',
        inStock: true,
      },
      {
        name: 'Car Floor Mats',
        description: 'Premium all-weather car floor mats for protection.',
        price: 89.99,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
        inStock: true,
      },
    ]
    await Product.insertMany(products)
    console.log(`${products.length} products created`)

    // Create services
    const services = [
      {
        name: 'Car Wash & Detailing',
        description:
          'Comprehensive car wash and detailing service including exterior wash, interior vacuuming, window cleaning, and tire shine. We use premium products to ensure your car looks brand new.',
        videoUrl: '',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      },
      {
        name: 'Denting & Painting',
        description:
          'Professional dent removal and paint restoration services. Our expert technicians can fix any dent and match your car\'s original paint color perfectly.',
        videoUrl: '',
        image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
      },
      {
        name: 'Full Custom Modification',
        description:
          'Complete car customization service including body kits, engine modifications, interior upgrades, and performance enhancements. Transform your car into a unique masterpiece.',
        videoUrl: '',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
      },
      {
        name: 'Parking & Café Facility',
        description:
          'Comfortable parking facility and cozy café where you can relax while we service your car. Enjoy premium coffee and snacks in our modern waiting area.',
        videoUrl: '',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      },
    ]
    await Service.insertMany(services)
    console.log(`${services.length} services created`)

    // Create staff
    const staff = [
      {
        name: 'John Smith',
        role: 'Board Member',
        description: 'Founder and CEO of Car Heritage with over 20 years of experience in the automotive industry.',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      },
      {
        name: 'Sarah Johnson',
        role: 'Manager',
        description: 'Operations Manager ensuring smooth day-to-day operations and customer satisfaction.',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      },
      {
        name: 'Mike Davis',
        role: 'Technician',
        description: 'Senior automotive technician specializing in custom modifications and engine tuning.',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      },
      {
        name: 'Emily Chen',
        role: 'Technician',
        description: 'Expert in denting, painting, and bodywork restoration with 10 years of experience.',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      },
      {
        name: 'David Wilson',
        role: 'Worker',
        description: 'Dedicated car wash and detailing specialist ensuring every vehicle gets premium treatment.',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      },
      {
        name: 'Lisa Anderson',
        role: 'Worker',
        description: 'Customer service representative and café manager, making sure every customer feels welcome.',
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      },
    ]
    await Staff.insertMany(staff)
    console.log(`${staff.length} staff members created`)

    // Create reviews
    const reviews = [
      {
        name: 'Robert Martinez',
        rating: 5,
        description:
          'Excellent service! My car looks brand new after their detailing service. The staff is professional and the café is a great addition.',
        approved: true,
      },
      {
        name: 'Jennifer Lee',
        rating: 5,
        description:
          'Best car modification shop in town! They transformed my car exactly as I envisioned. Highly recommended!',
        approved: true,
      },
      {
        name: 'Michael Brown',
        rating: 4,
        description:
          'Great dent removal service. The paint match was perfect and you can\'t even tell there was damage before.',
        approved: true,
      },
      {
        name: 'Amanda Taylor',
        rating: 5,
        description:
          'Love the parking and café facility! I could relax while my car was being serviced. The coffee is amazing too!',
        approved: true,
      },
      {
        name: 'Chris Anderson',
        rating: 4,
        description:
          'Professional staff and quality products. Bought several accessories and they all exceeded my expectations.',
        approved: true,
      },
    ]
    await Review.insertMany(reviews)
    console.log(`${reviews.length} reviews created`)

    // Create about information
    const about = new About({
      companyHistory:
        'Car Heritage was founded in 2010 with a vision to provide premium automobile care services. Starting as a small car wash facility, we have grown into a full-service automotive center offering everything from basic maintenance to complete custom modifications.\n\nOver the years, we have served thousands of satisfied customers and built a reputation for excellence in the automotive industry. Our commitment to quality and customer satisfaction has made us a trusted name in car care and customization.',
      mission:
        'To provide exceptional automobile care and customization services that exceed customer expectations while maintaining the highest standards of quality and professionalism.',
      vision:
        'To become the leading automotive service provider known for innovation, quality, and customer-centric approach in the industry.',
      values:
        'Quality, Integrity, Customer Satisfaction, Innovation, and Professionalism are the core values that drive everything we do at Car Heritage.',
      certificateImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
      owner: {
        name: 'John Smith',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        thoughts:
          'Car Heritage is more than just a business to me - it\'s a passion. I started this company because I believe every car owner deserves access to premium care and customization services. Our team is dedicated to making your automotive dreams come true, whether it\'s a simple wash or a complete transformation. We treat every vehicle as if it were our own, and that\'s what sets us apart.',
      },
    })
    await about.save()
    console.log('About information created')

    console.log('\n✅ Seed data created successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding data:', error)
    process.exit(1)
  }
}

seedData()



