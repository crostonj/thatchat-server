var express = require('express');
var chatRouter = express.Router();

var router = function() {
    chatRouter.use(function(req, res, next) {
        console.log('Time: ', Date.now());
        next();
    });

    chatRouter.get('/', function(req, res, next) {

    });

    return chatRouter;
}
module.exports = router;