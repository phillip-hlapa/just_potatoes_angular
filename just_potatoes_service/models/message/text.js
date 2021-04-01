const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var APP_CONSTANTS = require('../../utils/App-Constants')

const  TextSchema = mongoose.Schema({
    dateCreated: {type: Date, require: true, default: Date.now},
    expireAt: {type: Date, default: Date.now, index: {expires: APP_CONSTANTS.USER_EXPIRE_AT + 3000}},
    text: {  type: String, require: true },
    replyFrom: {  type: String, require: true }
})

module.exports = mongoose.model('Text', TextSchema);
