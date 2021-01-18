if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Record = require('../Record')
const User = require('../user')
const expense = require('../expense-1.json')
const spends = expense.results
const bcrypt = require('bcryptjs')

const SEED_USER2 = {
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER2.password, salt))
    .then(hash => User.create({
      name: SEED_USER2.name,
      email: SEED_USER2.email,
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