const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')


router.get('/', (req, res) => {
  let { category, month } = req.query
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
    category: { $regex: category, $options: 'i' },
    date: { $regex: monthSearch, $options: 'i' },
    userId
  }

  const spendSumPromise = Record.aggregate([
    {
      $match: query
    },
    { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
  ])

  const recordPromise = Record.aggregate([
    {
      $match: query
    }])

  Promise.all([spendSumPromise, recordPromise])
    .then(([spendSum, record]) => {
      let totalAmount = spendSum.length ? spendSum[0].totalAmount : 0
      res.render('index', { record, totalAmount, category, month })
    })
    .catch(error => console.log(error))

})

module.exports = router