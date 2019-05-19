// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to Train App Backend!',
    });
});

// Import controllers
var trainController = require('./controller/trainController');
var routeController = require('./controller/routeController');
var userController = require('./controller/userController');
var paymentController = require('./controller/paymentController');

// Train details routes
router.route('/trains/add').post(trainController.new); //add new train
router.route('/trains/all').get(trainController.index); //get all trains
router.route('/trains/view/:train_id').get(trainController.view); //view single train
router.route('/trains/update/:train_id').post(trainController.update); //update train
router.route('/trains/delete/:train_id').get(trainController.delete); //delete train

// Train Route details routes
router.route('/route/add').post(routeController.new); //add new train route
router.route('/route/all').get(routeController.index); //get all trains routes
router.route('/route/all/:route').get(routeController.indexFilter); //filter routes
router.route('/route/view/:route_id').get(routeController.view); //view single train route
router.route('/route/update/:route_id').post(routeController.update); //update route
router.route('/route/delete/:route_id').get(routeController.delete); //delete route

//User details routes
router.route('/user/add').post(userController.new); //add new user
router.route('/user/:user_email/:password').get(userController.indexFilter); //user login

//Payment details routes
router.route('/payment/card').post(paymentController.card); //card payment gateway
router.route('/payment/dialog').post(paymentController.dialog); //dialog payment gateway

// Export API routes
module.exports = router;