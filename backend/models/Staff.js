const mongoose = require('mongoose')

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['Board Member', 'Manager', 'Technician', 'Worker'],
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model('Staff', staffSchema)




