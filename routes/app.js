var express = require('express');
var appRouter = express.Router();

var router = function(){
    appRouter.use(function (req, res, next) {
        console.log('Time: ', Date.now());
        next();
    });

    appRouter.get('/', function(req, res, next) {
        res.send('hello');
    });

    return appRouter;
}
module.exports = router;
