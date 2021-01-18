const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')


router.get('/', (req, res) => {
  let category = req.query.category
  let month = req.query.month
  const userId = req.user._id

  if (category === undefined || month === undefined) {
    category = ""
    month = ""
  }

  let totalAmount = 0
  let monthSearch = `[0-9]{4}-${month}-[0-9]{2}`

  if (month === "") {
    monthSearch = ""
  }

  const query = {
    $and: [
      { category: { $regex: category, $options: 'i' }, userId },
      { date: { $regex: monthSearch, $options: 'i' }, userId }
    ]
  }

  Record.find(query)
    .lean()
    .then(record => {
      record.forEach(item => {
        totalAmount += item.amount
      })
      res.render('index', { record, totalAmount, category, month })
    })
    .catch(error => console.log(error))

})

module.exports = router