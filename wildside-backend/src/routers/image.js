var express = require('express')
const fs = require('fs');
var router = express.Router()
const fsPromises = require('fs').promises;
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  //console.log('Time: ', Date.now())
  //todo add validation middleware
  next()
})

router.get('/', function (req, res) {
    
    async function openAndClose() {
    let filehandle;
    try {
        console.log(fs.realpathSync("../media"))
        filehandle = await fsPromises.open('../media/images/image.jpeg', 'r');
        res.sendFile(filehandle)
    } finally {
        if (filehandle !== undefined)
        await filehandle.close();
    }
    }
    openAndClose();
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