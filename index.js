var express = require('express');
var app = express();

var port = 3500;

var users = [
    { id: 1, name: "nhat"},
    { id: 2, name: "minh"}
];
app.set('view engine', 'pug');
app.set('views', './views');

// thu muc me la views
app.get('/', function(req, res){
    res.render('index');
});

app.get('/users',function(req, res){
    res.render('users/', {
      users : users
    });
});

app.get('/users/search', function(req, res){
    var q = req.query.q;
    var matchedUsers = users.filter(function(users){
        return users.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/',{ users : matchedUsers});
})

app.listen(port, function(){
    console.log('server listening on port ' + port);
});