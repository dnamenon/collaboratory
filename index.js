var express = require('express');
var bodyParser = require('body-parser')
const { home, postLogin, postRegister } = require('./routes');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
app.use(express.static('public'));



// index page
app.get('/', home);

app.get('/register', function(req, res) {
  res.render('register');
});


app.post('/login', urlencodedParser, postLogin);

app.post('/register',urlencodedParser, postRegister);


app.get('/userhome', function(req, res) {
  res.render('userhome');
});




app.listen(8080);
console.log('Server is listening on port 8080');