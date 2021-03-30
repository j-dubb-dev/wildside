import express from  'express'
import path from 'path'
import fs from 'fs'

import bodyParser from 'body-parser';

import Controller from '../controllers/image.js';
import { authorRole, authorize } from '../middleware/auth.js';
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
  console.log('IMAGE')
  next()
})

router.get('/:file', Controller.find)
router.get('/', Controller.findAll)
router.post('/', Controller.upload, )
router.put('/', authorRole, authorize, Controller.upload, Controller.create)
router.delete('/', Controller.delete)

export default router