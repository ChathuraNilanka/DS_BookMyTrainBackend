User = require('../model/userModel');

// Handle create user actions
exports.new = function (req, res) {
    var user = new User();
    user.email = req.body.email ? req.body.email : route.email;
    user.password = req.body.password;
    user.phone_number = req.body.mobile;
    user.nic = req.body.nic;
    var _nic = req.body.nic;
    var _type = parseInt(_nic.substr(0, 9));
    if(_type % 2 == 0){
        user.user_type = "gov";
    }else{
        user.user_type = "non_gov";
    }
// save the user and check for errors
user.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New user added!',
            data: user
        });
    });
};

//get specific user
exports.indexFilter = function (req, res) {
    var query = { 
        email: req.params.user_email,
        password: req.params.password
    };
    User.find(query, function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            users
        });
    });
};