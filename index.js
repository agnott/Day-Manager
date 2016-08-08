// Get env var
require('dotenv').config();

// Get and configure express connector
var express = require('express');
var app = express();
app.use(express.static('public'));

// Get and configure Postgres connector
var pg = require('pg');
pg.defaults.ssl = true


/**
  List all files
**/
app.get('/api/files', function (req, res) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT id, created, name FROM files WHERE deleted=false', function(err, result) {
      done();
      if (err){
        console.error(err);
        res.send("Error " + err);
      }else{
        res.send(result.rows);
      }
    });
  });
});

app.listen(process.env.PORT || 5000, function () {
  console.log(`Example app listening on port ${process.env.PORT || 5000}!`);
});
