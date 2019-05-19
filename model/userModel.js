// trainModel.js
var mongoose = require('mongoose');
// Setup schema with variables
var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true
    }
});
// Export Train model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}

