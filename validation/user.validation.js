module.exports.postCreate = function(req , res, next){
    var errors = [];
    if(!req.body.name){
        errors.push('name is required.')
    }
    if(!req.body.password){
        errors.push('password is required.')
    }
    if(errors.length){
        res.render('users/create',{errors:errors, value: req.body});
        return;
    }
    next();
}