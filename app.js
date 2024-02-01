const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

var im = require('imagemagick');
var fs = require('fs');

app.get('/', (req, res) => {

  const url = req.query['u']
  const name = Date.now() + '.jpg'
  const path = __dirname + '/' + name
  const width = req.query['w'] ?? 500
  const quality = req.query['q'] ?? 0.8

  im.resize({
      srcPath: url,
      dstPath: name,
      width: width,
      quality: quality,
      format: 'jpg',
  }, function(err, stdout, stderr){
      if (err) throw err;

      res.sendFile(path, (errs) => {
          if (errs) throw errs;

          fs.unlink(path, (erru) => {
              if (erru) throw erru;
          })
      })
      
  });
})

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
