// Get env var
require('dotenv').config();

// Get and configure express connector
var express = require('express');
var app = express();
app.use(express.static('public'));

// Get and configure Postgres connector
var pg = require('pg');
pg.defaults.ssl = true

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    console.log(client);
    client.query('SELECT * FROM test', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.send({results: result.rows}); }
    });
  });
})

app.listen(process.env.PORT || 5000, function () {
  console.log(`Example app listening on port ${process.env.PORT || 5000}!`);
});
