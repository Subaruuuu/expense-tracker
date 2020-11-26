const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')

router.get('/', (req, res) => {
  const filter = req.query.options
  let totalAmount = 0

  if (filter === 'all') {
    Record.find()
      .lean()
      .then(record => {
        record.forEach(item => {
          totalAmount += item.amount
        })
        res.render('index', { record: record, totalAmount: totalAmount })
      })
      .catch(error => console.log(error))
  } else {
    Record.find({ category: filter })
      .lean()
      .then(record => {
        record.forEach(item => {
          totalAmount += item.amount
        })
        res.render('index', { record: record, filter: filter, totalAmount: totalAmount })
      })
      .catch(error => console.log(error))
  }
})


module.exports = router