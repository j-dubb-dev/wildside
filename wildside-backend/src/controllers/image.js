import Image from '../models/image.js';
import multer from 'multer';
const fileFilter =  (req,file, cb) => {
    console.log(file)
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/svg+xml') {
        req.file = file;
        cb(null, true);
    } else {
        cb(null, false);
    }
  }
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
const Controller = {
       
    upload: multer({ storage, fileFilter }).single('image'),
    find: (req,res) => {
         
        res.sendFile(`/app/media/images/${req.params.file}`)
    },
    create: async (req, res) => {
        console.log('CREATE FILE')
        let file = req.file
        let image = new Image({
            name: file.originalname,
            type: file_type_map[file.mimetype],
            owner: req.user._id,
            kind: req.body.kind
          })
        await image.save()
        console.log(file)

        res.send(image)
    },
    findAll: async (req,res) => {
        const imagesFolder = '/app/media/images';

       const images = await Image.find({})
       console.log('FIND ALL IMAGES')
       res.send(images)
        //res.send(fs.readdirSync(imagesFolder).map(file => {
        //return file
        //}));
    },
  
    update: (req,res) => {
        res.send('put')
    },
    delete: (req, res) => {
        res.send('deleted')
    }
}

export default Controller;