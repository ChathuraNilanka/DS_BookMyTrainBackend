// trainModel.js
var mongoose = require('mongoose');
// Setup schema
var routeSchema = mongoose.Schema({
    mainRoute: {
        type: String,
        required: true
    },
    route: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});
// Export Train model
var Route = module.exports = mongoose.model('route', routeSchema);
module.exports.get = function (callback, limit) {
    Route.find(callback).limit(limit);
}

