const mongoose = require('mongoose')
const Record = require('../Record')
const expense = require('../expense-2.json')
const spends = expense.results

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  spends.forEach(spend => {
    Record.create(spend)
  })

  console.log('done.')
})