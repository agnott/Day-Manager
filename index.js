// Get env vars
require('dotenv').config();

//Set up css
var less = require('less');
var fs = require('fs');
var file = fs.readFileSync('public/main.less', "utf8");
less.render(file, {}, function(err, output){
  if(err){
    console.error(err);
  }else{
    fs.writeFile("public/main.css", output.css, function(err) {
      if(err) {
        console.log(err);
      }
    });
  }
});

// Get and configure express connector
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get and configure Postgres connn nodeector
var pg = require('pg');
pg.defaults.ssl = true

// Set up bcryptjs hashing
var bcrypt = require('bcryptjs');

/**
  Create a new user
**/
app.post('/api/users/create', function(req, res){
  // Ensure password is valid
  if( !req.body.username
    || !req.body.keycode
    || !req.body.keycode.match(/^[0-9]+$/)
    || !req.body.username.match(/^[a-zA-Z0-9]+$/)
  ){
    res.status(500).send("Error: Invalid username or password.");
  }else{
    //Create stored password hash
    bcrypt.hash(req.body.username+req.body.keycode, Number(process.env.SALTS), function(err, hash) {
      if(err){
        console.error('Error: ' + err);
        res.status(500).send('Error: ' + err);
      }else{
        pg.connect(process.env.DATABASE_URL, function(err, client, done){
          client.query({
            text: 'INSERT INTO member (username, hash) values ($1, $2)',
            values: [req.body.username, hash]
          },function(err, result){
            done();
            if(err){
              res.status(500).send('Error: ' + err);
            }else{
              res.send('Successs');
            }
          })
        });
      }
    });
  }
});

/**
  Login
**/
app.post('/api/users/login', function(req, res){
  if( !req.body.username || !req.body.keycode ){
    res.status(500).send("Error: Invalid username or password.");
  }else{
    pg.connect(process.env.DATABASE_URL, function(err, client, done){
      client.query({
        text: 'SELECT * FROM member WHERE username = $1 LIMIT 1',
        values: [req.body.username]
      }, function(err, result){
        done();
        if( result.rowCount === 1 ){
          bcrypt.compare(req.body.username+req.body.keycode, result.rows[0].hash, function(err, state) {
            if(err){
              res.status(500).send('Error: ' + err);
            }else if(state){
              res.send('Success');
            }else{
              res.status(500).send('Error: Incorrect password.');
            }
          });
        }else{
          res.status(500).send("Error: Could not find user.");
        }
      });
    });
  }
});

/**
  List all files
app.get('/api/notes', function (req, res) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT id, created, name, path FROM files WHERE deleted=false', function(err, result) {
      done();
      if (err){
        console.error(err);
        res.send("Error: " + err);
      }else{
        //Sanitize the rows
        var folders = [];
        var path = [];
        for(var i=0; i<result.rows.length; i++){
          path = result.rows[i].
        }

        res.send(result.rows);
      }
    });
  });
});
**/
/**
  Get a file by id
app.get('/api/notes/:id', function(req, res){
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
          res.send("Error: Note does not exist.")
        }
      }
    );
  });
});
**/
app.listen(process.env.PORT || 5000, function () {
  console.log(`Example app listening on port ${process.env.PORT || 5000}!`);
});
