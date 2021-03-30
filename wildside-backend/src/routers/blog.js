import express from 'express';
import Controller from '../controllers/blog.js';
import authenticate, {blogAdminRole, authorize} from '../middleware/auth.js';
const router = express.Router();

router.use(function timeLog (req, res, next) {
  console.log('Blog')
  next()
})

router.get('/', Controller.findAll);
router.get('/:id/stories', Controller.findAllStories);
router.get('/:name',Controller.find);
router.put('/',blogAdminRole, authorize, Controller.create);
router.post('/:id', Controller.update);
router.delete('/:id', Controller.delete);


export default router;