// trainModel.js
var mongoose = require('mongoose');
// Setup schema
var trainSchema = mongoose.Schema({
    route: {
        type: String,
        required: true
    },
    time: any ={},

    price: any ={},

    imgUrl: {
        type: String,
        required: true
    }
});
// Export Train model
var Train = module.exports = mongoose.model('train', trainSchema);
module.exports.get = function (callback, limit) {
    Train.find(callback).limit(limit);
}