var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// lowdb setup
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ users: [] })
  .write();
//
var port = 3500;


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

app.get('/users',function(req, res){
    res.render('users/', {
      users : db.get('users').value()
    });
});

app.get('/users/search', function(req, res){
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(function(users){
        return users.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/',{ users : matchedUsers});
})

app.get('/users/create', function(req, res){
    res.render('users/create');
});

app.post('/users/create', function(req, res){
    db.get('users').push(req.body).write();
    res.redirect('/users/')
});

app.listen(port, function(){
    console.log('server listening on port ' + port);
});