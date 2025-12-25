const mongoose = require('mongoose')

const aboutSchema = new mongoose.Schema({
  companyHistory: {
    type: String,
    default: '',
  },
  mission: {
    type: String,
    default: '',
  },
  vision: {
    type: String,
    default: '',
  },
  values: {
    type: String,
    default: '',
  },
  certificateImage: {
    type: String,
    default: '',
  },
  owner: {
    name: {
      type: String,
      default: '',
    },
    photo: {
      type: String,
      default: '',
    },
    thoughts: {
      type: String,
      default: '',
    },
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model('About', aboutSchema)




