var express = require('express');
var app = express();
const posts = require('./routers/post');
const images = require('./routers/image');
const port = 8080;
app.use("/post", posts);
app.use("/image", images);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })