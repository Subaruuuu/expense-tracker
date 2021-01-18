if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Record = require('../Record')
const expense = require('../expense-2.json')
const spends = expense.results
const bcrypt = require('bcryptjs')



db.once('open', () => {

  spends.forEach(spend => {
    Record.create(spend)
  })

  console.log('done.')
})