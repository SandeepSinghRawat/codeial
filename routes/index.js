const express = require('express');
const passport = require('passport');
const homeController = require('../controllers/home_controller');
const router = express.Router();


router.use('/users', require('./users'));

router.use('/posts', require('./posts'));

router.use('/comments', passport.checkAuthentication, require('./comments'));

router.use('/api', require('./api'));

router.get('/', homeController.home);
module.exports = router;