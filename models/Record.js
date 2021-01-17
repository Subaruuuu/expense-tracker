const mongoose = require('mongoose')
const user = require('./user')
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
  merchant: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    require: true
  }
})

module.exports = mongoose.model('Record', RecordSchema)
