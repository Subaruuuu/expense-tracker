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

  const spendSum = Record.aggregate([
    {
      $match: query
    },
    { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
  ])

  const record = Record.aggregate([
    {
      $match: query
    }])

  Promise.all([spendSum, record])
    .then(([spendSum, record]) => {
      let totalAmount = spendSum.length ? spendSum[0].totalAmount : 0
      res.render('index', { record, totalAmount, category, month })
    })
    .catch(error => console.log(error))

  // Record.find(query)
  //   .lean()
  //   .then(record => {
  //     record.forEach(item => {
  //       totalAmount += item.amount
  //     })
  //     res.render('index', { record, totalAmount, category, month })
  //   })
  //   .catch(error => console.log(error))

  // Record.aggregate([
  //   {
  //     $match: query
  //   }])
  //   .then(record => {
  //     // console.log(totalAmount)
  //     res.render('index', { record, totalAmount, category, month })
  //   })
  //   .catch(error => console.log(error))

})

module.exports = router