var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
app.use(express.static('public'));



// index page
app.get('/', function(req, res) {
  res.render('login');
});



app.listen(8080);
console.log('Server is listening on port 8080');