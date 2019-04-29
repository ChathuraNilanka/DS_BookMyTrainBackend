Route = require('../model/routeModel');
// Handle index actions
exports.index = function (req, res) {
    Route.get(function (err, routes) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            routes
        });
    });
};

//get specific data
exports.indexFilter = function (req, res) {
    var query = { mainRoute: req.params.route};
    Route.find(query, function (err, routes) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            routes
        });
    });
};
// Handle create route actions
exports.new = function (req, res) {
    var route = new Route();
    route.mainRoute = req.body.mainRoute ? req.body.mainRoute : route.mainRoute;
    route.route = req.body.route;
    route.price = req.body.price;
// save the route and check for errors
route.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New route added!',
            data: route
        });
    });
};
// Handle view route info
exports.view = function (req, res) {
    Route.findById(req.params.route_id, function (err, route) {
        if (err)
            res.send(err);
        res.json({
            message: 'Route details loading..',
            data: route
        });
    });
};
// Handle update route info
exports.update = function (req, res) {
    Route.findById(req.params.Route_id, function (err, route) {
        if (err)
            res.send(err);
            route.mainRoute = req.body.mainRoute ? req.body.mainRoute : route.mainRoute;
            route.route = req.body.route;
            route.price = req.body.price;
// save the route and check for errors
route.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Route Info updated',
                data: route
            });
        });
    });
};
// Handle delete route
exports.delete = function (req, res) {
    Route.remove({
        _id: req.params.route_id
    }, function (err, route) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Route deleted'
        });
    });
};