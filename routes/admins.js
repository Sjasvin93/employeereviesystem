//Including the express library
const express = require('express');

//Iniiating the express router
const router = express.Router();

//Including the admins controller
const adminController = require('../controllers/admins_controller');

//Routing to the employee update page
router.get('/update-employee/:id', adminController.employeeUpdate);

//Routing to the employee update action
router.post('/update/:id', adminController.update);

//Routing to the employee update action
router.post('/employee-action/:id', adminController.updateToAdmin);

//Routing to the employee details page
router.get('/employee-details/:id', adminController.employeeDetails);

//Routing to the employee assign reviews page
router.get('/assign-reviews/:id', adminController.assignReviews);

//Routing to the employee update action
router.post('/assign-employee-reviews/:id', adminController.employeeAssignReview);

//Exporting the router
module.exports = router;