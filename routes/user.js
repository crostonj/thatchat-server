var express = require('express');
var userRouter = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');


var router = function(){

    //middleware
    userRouter.use(function (req, res, next) {
        console.log('Time: ', Date.now());
        next();
    });


    userRouter.route('/').post(function (req, res) {
        var user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: bcrypt.hashSync(req.body.password, 10),
            email: req.body.email
        });
        user.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'User created',
                obj: result
            });
        });
    });

    userRouter.route('/signin').post(function(req, res) {
        User.findOne({email: req.body.email}, function(err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (!user) {
                return res.status(401).json({
                    title: 'Login failed',
                    error: {message: 'Invalid login credentials'}
                });
            }
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(401).json({
                    title: 'Login failed',
                    error: {message: 'Invalid login credentials'}
                });
            }
            var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
            res.status(200).json({
                message: 'Successfully logged in',
                token: token,
                userId: user._id
            });
        });
    });

    return userRouter;
}
module.exports = router;
