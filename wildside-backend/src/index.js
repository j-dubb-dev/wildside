import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import User from './routers/user.js';
import Blog from './routers/blog.js';
import Story from './routers/story.js';
//import Image from'./routers/image.js';
import Image from './routers/images.js';
import authenticate from './middleware/auth.js';
import bodyParser from 'body-parser';
import cors from 'cors';
mongoose.connect('mongodb://localhost:27018/test', {useNewUrlParser: true, useUnifiedTopology: true});
var app = express();

const port = 8080;
app.use(function timeLog (req, res, next) {
  //console.log('Time: ', Date.now())
  //todo add validation middleware
  next()
})
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true
}
app.use(cors(corsOptions));
app.use(express.json());
app.set('trust proxy', 1) // trust first proxy
app.use(cookieSession({
  name: 'session',
  keys: ['f#fk3K%ro9^&njs8%3kshf%gj0@3mfsdf368lbeqch5g4$668'],
  maxAge: 24 * 60 * 60 * 1000, //24 hours
  httpOnly: false,
  overwrite: true,
}))
app.use(authenticate)
app.use("/image", Image);


app.use("/blogs", Blog)
app.use("/stories", Story);
app.use("/users", User);
app.listen(port, () => {
    console.log(`Example app listening at http://0.0.0.0:${port}`)
})
  