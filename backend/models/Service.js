const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model('Service', serviceSchema)




