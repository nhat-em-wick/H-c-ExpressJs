var express = require('express');
var bodyParser = require('body-parser');
var userRoute = require('./routes/users.route');
//

var port = 3500;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())
// thu muc me la views
app.get('/', function(req, res){
    res.render('index');
});

app.use('/users', userRoute);

app.listen(port, function(){
    console.log('server listening on port ' + port);
});