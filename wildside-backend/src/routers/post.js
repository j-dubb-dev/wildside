var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  //console.log('Time: ', Date.now())
  //todo add validation middleware
  next()
})
// define the home page route
router.get('/list', function (req, res) {
  res.send('get list')
})
router.get('/', function (req, res) {
    res.send('get')
  })
// define the about route
router.put('/', function (req, res) {
  res.send('put')
})

router.post('/', function (req, res) {
    res.send('post')
})

router.delete('/', function (req, res) {
    res.send('deleted')
})


module.exports = router