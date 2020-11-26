const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const filter = require('./modules/filter')
const record = require('./modules/record')

router.use('/', home)
router.use('/filter', filter)
router.use('/record', record)

module.exports = router