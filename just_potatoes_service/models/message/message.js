const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var APP_CONSTANTS = require('../../utils/App-Constants')

const  messageSchema = mongoose.Schema({
    sender: {type:  Schema.Types.ObjectId, ref: 'User'},
    messageHeader: { type: String, require: true },
    message: { type: String, require: true  },
    dateCreated: {type: Date, require: false, default: Date.now},
    expireAt: {type: Date, default: Date.now, index: {expires: APP_CONSTANTS.USER_EXPIRE_AT + 10000}},
    textMessages: [{type:  Schema.Types.ObjectId, ref: 'Text', required: false}]
})

module.exports = mongoose.model('MESSAGE', messageSchema);
