let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = Schema({
    content: {type: String, required: true},
    user: {type: String, ref: 'User'},
    datetime: {type: String, required: true},
    messageId: {type: Schema.Types.ObjectId},
});


module.exports = mongoose.model('Message', schema);
