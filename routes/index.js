const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const record = require('./modules/record')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')
const auth = require('./modules/auth')
// const filter = require('./modules/filter')


// router.use('/filter', filter)
router.use('/record', authenticator, record)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router