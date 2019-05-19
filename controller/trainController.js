// train.js
// Import train model
Train = require('../model/trainModel');
// Handle index actions
exports.index = function (req, res) {
    Train.get(function (err, trains) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            data: trains
        });
    });
};
// Handle create train actions
exports.new = function (req, res) {
    var train = new Train();
    train.trainName = req.body.name ? req.body.name : train.name;
    train.trainRoute = req.body.route;
    train.trainType = req.body.type;
// save the train and check for errors
train.save(function (err) {
    res.json({
            message: 'New train added!',
            data: train
        });
    });
};
// Handle view train info
exports.view = function (req, res) {
    Train.findById(req.params.train_id, function (err, train) {
        if (err)
            res.send(err);
        res.json({
            message: 'Train details loading..',
            data: train
        });
    });
};
// Handle update train info
exports.update = function (req, res) {
    Train.findById(req.params.train_id, function (err, train) {
        if (err)
            res.send(err);
        train.trainName = req.body.name ? req.body.name : train.name;
        train.trainRoute = req.body.route;
        train.trainType = req.body.type;
// save the train and check for errors
train.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Train Info updated',
                data: train
            });
        });
    });
};
// Handle delete train
exports.delete = function (req, res) {
    Train.remove({
        _id: req.params.train_id
    }, function (err, train) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Train deleted'
        });
    });
};