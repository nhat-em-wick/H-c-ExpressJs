var db = require('../db');
var shortid = require("shortid");

module.exports.index = function(req, res){
    res.render('users/', {
      users : db.get('users').value()
    });
}

module.exports.search = function(req, res){
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(function(users){
        return users.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/',{ users : matchedUsers});
}

module.exports.create = function(req, res){
    console.log(req.cookies);
    res.render('users/create');
}

module.exports.get = function(req, res){
    var id = req.params.id;
    var user = db.get('users').find({id:id}).value();
    console.log(user);
    res.render('users/view',{user:user});
}

module.exports.postCreate = function(req, res){
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
}