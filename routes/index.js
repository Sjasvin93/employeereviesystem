//Including the express library
const express = require('express');

//Iniiating the express router
const router = express.Router();

//Including the home controller
const homeController = require('../controllers/home_controller');

//Routing to the home page
router.get('/', homeController.home);

//Routing to the users controller
router.use('/users', require('./users'));

//Routing to the admin controller
router.use('/admins', require('./admins'));

//Routing to the employees controller
router.use('/employees', require('./employees'));

//Exporting the router
module.exports = router;