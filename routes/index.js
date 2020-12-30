const express = require('express');
const homeController = require('../controllers/home_controller');
const router = express.Router();

router.use('/users', require('./users'));

router.use('/posts', require('./posts'));

router.get('/', homeController.home);
module.exports = router;