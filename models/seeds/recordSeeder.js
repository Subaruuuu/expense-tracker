const db = require('../../config/mongoose')
const Record = require('../Record')
const expense = require('../expense.json')
const spends = expense.results

db.once('open', () => {

  spends.forEach(spend => {
    Record.create(spend)
  })

  console.log('done.')
})