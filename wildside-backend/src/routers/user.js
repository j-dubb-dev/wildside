import express from 'express';
import Controller from '../controllers/user.js';
import authenticate, {adminRole, authorize, readerRole} from '../middleware/auth.js';
const router = express.Router();

router.use(function timeLog (req, res, next) {
  console.log('User')
  next()
})

router.get('/',  adminRole, authorize, Controller.findAll);
router.get('/signout', Controller.signout);
router.get('/:id', readerRole, Controller.find);
router.put('/signup', Controller.create);
router.post('/signin', Controller.signin);
router.post('/password', Controller.passwordUpdate);
router.post('/:id', Controller.update);

router.delete('/:id', Controller.delete);


export default router