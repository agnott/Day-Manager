// Get env vars
require('dotenv').config();

// Get and configure express connector
var express = require('express');
var app = express();
app.use(express.static('public'));

// Get and configure Postgres connn nodeector
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
        res.send("Error: " + err);
      }else{
        res.send(result.rows);
      }
    });
  });
});

/**
  Get a file by id
**/
app.get('/api/files/:id', function(req, res){
  pg.connect(process.env.DATABASE_URL, function(err, client, done){
    // Ensure parameter is numberic
    if( isNaN(req.params.id) ){
      res.send("Error: Invalid ID.");
    }
    client.query(
      `SELECT * FROM files WHERE deleted=false AND id=${req.params.id} LIMIT 1`,
      function(err, result){
        done();
        if(err){
          console.error(err);
          res.send("Error " + err);
        }else if(result.rowCount > 0){
          res.send(result.rows[0]);
        }else{
          res.send("Error: File does not exist.")
        }
      }
    );
  });
});

app.listen(process.env.PORT || 5000, function () {
  console.log(`Example app listening on port ${process.env.PORT || 5000}!`);
});
