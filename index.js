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
var shortid = require('shortid');
var port = 3550;


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

app.get('/users/:id', function(req, res){
    var id = req.params.id;
    var user = db.get('users').find({id:id}).value();
    res.render('users/view',{user:user});
});

app.post('/users/create', function(req, res){
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users/')
});

app.listen(port, function(){
    console.log('server listening on port ' + port);
});