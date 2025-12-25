const mongoose = require('mongoose')
const User = require('../models/User')
require('dotenv').config()

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/carheritage'
    )
    console.log('Connected to MongoDB')

    // Check if admin exists
    const existingAdmin = await User.findOne({ username: 'admin' })
    
    if (existingAdmin) {
      console.log('Admin user already exists. Updating password...')
      existingAdmin.password = 'admin123'
      await existingAdmin.save()
      console.log('✅ Admin password updated successfully!')
      console.log('Username: admin')
      console.log('Password: admin123')
    } else {
      console.log('Creating new admin user...')
      const admin = new User({
        username: 'admin',
        password: 'admin123',
      })
      await admin.save()
      console.log('✅ Admin user created successfully!')
      console.log('Username: admin')
      console.log('Password: admin123')
    }

    // Verify the user was created/updated
    const verifyUser = await User.findOne({ username: 'admin' })
    if (verifyUser) {
      const bcrypt = require('bcryptjs')
      const isValid = await bcrypt.compare('admin123', verifyUser.password)
      console.log('Password verification:', isValid ? '✅ Valid' : '❌ Invalid')
    }

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

createAdmin()



