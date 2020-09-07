var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller');
var validate = require('../validation/user.validation');
var authMiddleware =require('../middlewares/auth.middleware');

router.get('/',authMiddleware.requireAuth, controller.index);


router.get('/search', controller.search)

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create',validate.postCreate, controller.postCreate);


module.exports = router;