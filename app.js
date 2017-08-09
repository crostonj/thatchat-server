var express = require('express');
var app = express();
var http = require('http');
var chatsocket = require('./src/chatSockets')();
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var mongoose = require('mongoose');



mongoose.connect('mongodb://localhost:27017/thatchat');

//app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Credentials", "false");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());




var appRoutes = require('./routes/app')();
var messageRoutes = require('./routes/message')();
var userRoutes = require('./routes/user')();

var port = 5000; //normalizePort(process.env.PORT || '5000');

app.use('/user', userRoutes);
app.use('/message', messageRoutes);
app.use('/', appRoutes);


var server = http.createServer(app);
var io = require('socket.io')(server);
chatsocket.Init(io);


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}



/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
}


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}