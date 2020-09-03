var express = require('express');
var app = express();

var port = 3500;

app.set('view engine', 'pug');
app.set('views', './views');

// thu muc me la views
app.get('/', function(req, res){
    res.render('index');
});

app.get('/users',function(req, res){
    res.render('users/', {
        users: [
            { id: 1, name: "nhat"},
            { id: 2, name: "minh"}
        ]
    });
});

app.listen(port, function(){
    console.log('server listening on port ' + port);
});