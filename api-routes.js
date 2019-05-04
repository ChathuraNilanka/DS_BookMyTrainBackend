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
router.route('/trains/add').post(trainController.new);
router.route('/trains/all').get(trainController.index);
router.route('/trains/view/:train_id').get(trainController.view);
router.route('/trains/update/:train_id').post(trainController.update);
router.route('/trains/delete/:train_id').get(trainController.delete);

// Train Route details routes
router.route('/route/add').post(routeController.new);
router.route('/route/all').get(routeController.index);
router.route('/route/all/:route').get(routeController.indexFilter);
router.route('/route/view/:route_id').get(routeController.view);
router.route('/route/update/:route_id').post(routeController.update);
router.route('/route/delete/:route_id').get(routeController.delete);

//User details routes
router.route('/user/add').post(userController.new);
router.route('/user/:user_email/:password').get(userController.indexFilter);

//Payment details routes
router.route('/payment/card').post(paymentController.card);
router.route('/payment/dialog').post(paymentController.dialog);

// Export API routes
module.exports = router;