const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Record = require('./models/Record')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// handlebars helper
const helper = exphbs.create({
  defaultlayout: 'main',
  helpers: {
    compare: function (x, y) { return (x === y) }
  },
  extname: '.hbs'
})

// engine 引入 helper
app.engine('hbs', helper.engine)
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))


// index
app.get('/', (req, res) => {
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

app.get('/filter', (req, res) => {
  // console.log(req.query)
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


// new
app.get('/new', (req, res) => {
  res.render('new')
})

app.post('/new', (req, res) => {
  // console.log(req.body)

  return Record.create(req.body)
    .then()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})

app.listen(port, (req, res) => {
  console.log(`this server is listenin on http://localhost:${port}`)
})
