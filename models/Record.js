const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  category: {
    type: String,
  },
  amount: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Record', RecordSchema)
