const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')


// new
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  // console.log(req.body)
  return Record.create(req.body)
    .then()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})

// edit
router.get('/:record_id/edit', (req, res) => {
  const id = req.params.record_id
  Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record: record }))
    .catch(error => console.log(error))

})

router.put('/:record_id', (req, res) => {
  const id = req.params.record_id

  Record.findById(id)
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:record_id', (req, res) => {
  const id = req.params.record_id

  Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router