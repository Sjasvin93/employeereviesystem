//Including the express library
const express = require('express');
const { route } = require('express/lib/application');

//Iniiating the express router
const router = express.Router();

//Including the home controller
const usersController = require('../controllers/users_controller');

//Routing to the signup page
router.get('/sign-up', usersController.signUp);

//Routing to the signup page
router.get('/sign-in', usersController.signIn);

//Routing to action create user
router.post('/create-user', usersController.createUser);

//Routing to action sign in user
router.post('/sign-in-user', usersController.profileLogIn);

//Exporting the router
module.exports = router;