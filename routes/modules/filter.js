const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')

router.get('/', (req, res) => {
  const category = req.query.options
  let totalAmount = 0

  if (category === 'all') {
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
    Record.find({ category })
      .lean()
      .then(record => {
        record.forEach(item => {
          totalAmount += item.amount
        })
        res.render('index', { record: record, category, totalAmount: totalAmount })
      })
      .catch(error => console.log(error))
  }
})

//這個模組目前不使用
module.exports = router