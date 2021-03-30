import express from  'express'
import path from 'path'
import fs from 'fs'

import bodyParser from 'body-parser';
import multer from 'multer';
var router = express.Router();
const fsPromises = fs.promises;
// middleware that is specific to this router

// for parsing application/json
router.use(bodyParser.json()); 

// for parsing application/xwww-
router.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data

router.use(express.static('public'));

router.use(function timeLog (req, res, next) {
  //console.log('Time: ', Date.now())
  //todo add validation middleware
  next()
})
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, '/app/media/images');
  },
  filename: (req, file, cb) => {

      cb(null,  file.originalname );
  }
});
const file_type_map = {
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/svg+xml': 'svg'
}
const fileFilter = (req, file, cb) => {
  console.log(file)
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/svg+xml') {
    
      let newFile = new Image({
        name: file,
        type: file_type_map[file.mimetype],
        owner: req.user._id
      })
      
      newFile.save((err, image)=> {
        if (err){
          res.status(400).send({error: 'Error saving image'})
        }
        else { 
          cb(null, true);
        }
      })
  } else {
      cb(null, false);
  }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });
router.get('/:file', function (req, res) {
  
 
   res.sendFile(`/app/media/images/${req.params.file}`)
  })
router.get('/', function (req, res) {
  const imagesFolder = '/app/media/images';


  res.send(fs.readdirSync(imagesFolder).map(file => {
  return file
}));
 

})
// define the about route
router.put('/', function (req, res) {
  console.log(req.body)
  
  res.send('put')
})

router.post('/',  upload.single('image'), function (req, res) {
   
    res.send('post')
})

router.delete('/', function (req, res) {
    res.send('deleted')
})

export default router