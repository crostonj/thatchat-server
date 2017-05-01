var express = require('express');
var messageRouter = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Message = require('../Models/message');



var router = function(){

     messageRouter.get('/', function (req, res, next) {
        Message.find()
        .populate('user', 'firstName')
        .exec(function (err, messages) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: messages
            });
        });
    });   
    
    return messageRouter;

    //middleware
    messageRouter.use('/', function (req, res, next) {
        jwt.verify(req.query.token, 'secret', function (err, decoded) {
            if (err) {
                return res.status(401).json({
                    title: 'Not Authenticated',
                    error: err
                });
            }
            next();
        })
    });

    //post
    messageRouter.route('/').post(function(req, res) {
        var decoded = jwt.decode(req.query.token);
        User.findById(decoded.user._id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            var message = new Message({
                content: req.body.content,
                user: user
            });

            message.save(function(err, result) {
                if(err) {
                    return res.status(500).json({
                        title: 'An error has occured',
                        error: err,
                    });
                }
                user.messages.push(result);
                user.save();
                res.status(201).json({
                    message: 'Saved message',
                    obj: result,
                });
            });
        });   
    });

   
}


module.exports = router;
