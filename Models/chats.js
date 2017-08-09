var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = Schema({
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    datetime: { type: String, required: true },
    chatId: { type: Schema.Types.ObjectId },
    chatName: { type: String }
});


module.exports = mongoose.model('Chat', schema);