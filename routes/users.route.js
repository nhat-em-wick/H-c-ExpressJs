var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller');
var validate = require('../validation/user.validation');

router.get('/', controller.index);

router.get('/cookie', function(req, res, next){
    res.cookie('user-id',12345);
    res.send('hello');
});

router.get('/search', controller.search)

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create',validate.postCreate, controller.postCreate);


module.exports = router;