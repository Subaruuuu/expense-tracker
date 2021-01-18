if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Record = require('../Record')
const User = require('../user')
const expense = require('../expense-2.json')
const spends = expense.results
const bcrypt = require('bcryptjs')

const SEED_USER1 = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER1.password, salt))
    .then(hash => User.create({
      name: SEED_USER1.name,
      email: SEED_USER1.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: spends.length },
        (_, i) => {
          return Record.create({
            ...spends[i], userId
          })
        }))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})