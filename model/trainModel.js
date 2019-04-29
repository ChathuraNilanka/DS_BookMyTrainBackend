// trainModel.js
var mongoose = require('mongoose');
// Setup schema
var trainSchema = mongoose.Schema({
    trainName: {
        type: String,
        required: true
    },
    trainRoute: {
        type: String,
        required: true
    },
    trainType: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Train model
var Train = module.exports = mongoose.model('train', trainSchema);
module.exports.get = function (callback, limit) {
    Train.find(callback).limit(limit);
}