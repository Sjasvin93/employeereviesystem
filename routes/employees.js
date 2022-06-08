//Including the express library
const express = require('express');

//Initiating the express router
const router = express.Router();

//Including the employees controller
const employeeController = require('../controllers/employees_controller');

//Routing to the employee submit feedback page
router.post('/give-feedback/:id', employeeController.employeeFeedback);

// Routing to the employee submit feedback action
router.post('/submit-feedback/:id', employeeController.employeeSubmitFeedback);

//Exporting the router
module.exports = router;