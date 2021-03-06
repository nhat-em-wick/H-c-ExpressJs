var express = require('express');
var bodyParser = require('body-parser');
var userRoute = require('./routes/users.route');
var authRoute = require('./routes/auth.route');
//
var cookieParser = require('cookie-parser');
var port = 3500;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
app.use(express.static('public'));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser('eadrdtyftf23'));
// thu muc me la views
app.get('/', function(req, res){
    res.render('index');
});

app.use('/users', userRoute);
app.use('/auth', authRoute);

app.listen(port, function(){
    console.log('server listening on port ' + port);
});