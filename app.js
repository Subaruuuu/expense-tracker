const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes/index')
const session = require('express-session')
require('./config/mongoose')


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

app.use(session({
  secret: "expenseSecret",    // 必填
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(routes)

app.listen(port, (req, res) => {
  console.log(`this server is listenin on http://localhost:${port}`)
})
