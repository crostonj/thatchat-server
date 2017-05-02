var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = Schema({
    content: {type: String, required: true},
    user: {type: String, required: true},
    datetime: {type: String, required: true},
    messageId: {type: Schema.Types.ObjectId},
});


module.exports = mongoose.model('Message', schema);
