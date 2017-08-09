var express = require('express');
var messageRouter = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Chat = require('../Models/chats');
var Message = require('../Models/message');

var router = function() {
    messageRouter.post('/', function(req, res) {
            var decoded = jwt.decode(req.query.token);
            Chat.findById(decoded.chat._id, function(err, chat) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }

                var message = new Message({
                    content: req.body.content,
                    chat: chat._id,
                    datetime: req.body.datetime,
                });

                message.save(function(err, result) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error has occured',
                            error: err,
                        });
                    }
                    //user.messages.push(result);
                    //user.save();
                    res.status(201).json({
                        message: 'Saved message',
                        obj: result,
                    });
                });
            });
        })
        .get('/', function(req, res, next) {
            Message.find()
                //.populate('user', 'firstName')
                .exec(function(err, messages) {
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
    messageRouter.use('/', function(req, res, next) {
        // jwt.verify(req.query.token, 'secret', function (err, decoded) {
        //     if (err) {
        //         return res.status(401).json({
        //             title: 'Not Authenticated',
        //             error: err
        //         });
        //     }
        //     next();
        // });

        next();
    });


    return messageRouter;
}

module.exports = router;