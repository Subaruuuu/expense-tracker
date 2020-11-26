const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')

router.get('/', (req, res) => {
  let totalAmount = 0

  Record.find()
    .lean()
    .then(record => {
      record.forEach(item => {
        totalAmount += item.amount
      })
      res.render('index', { record: record, totalAmount: totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router