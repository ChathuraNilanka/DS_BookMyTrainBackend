// trainModel.js
var mongoose = require('mongoose');
// Setup schema
var paymentSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    trainRoute: {
        type: String,
        required: true
    },
    numberOfTickets: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});
// Export Train model
var Payment = module.exports = mongoose.model('payment', paymentSchema);
module.exports.get = function (callback, limit) {
    Payment.find(callback).limit(limit);
}