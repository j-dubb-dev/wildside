import express from 'express';
import Controller from '../controllers/story.js';
import {authorize, authorRole} from '../middleware/auth.js';
const router = express.Router();

router.use(function timeLog (req, res, next) {
  console.log('Story')
  next()
})

router.get('/', Controller.findAll);
router.get('/blog/:id', Controller.findBlogStories);
router.get('/:id', Controller.find);
router.put('/', authorRole, authorize, Controller.create);
router.post('/:id', authorRole, authorize, Controller.update);
router.delete('/:id', authorRole, authorize, Controller.delete);


export default router