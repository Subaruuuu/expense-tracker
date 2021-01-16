const db = require('../../config/mongoose')
const Record = require('../Record')
const category = require('../category.json')
const cateogryList = category.results

db.once('open', () => {

  cateogryList.forEach(spend => {
    Record.create(spend)
  })

  console.log('done.')
})