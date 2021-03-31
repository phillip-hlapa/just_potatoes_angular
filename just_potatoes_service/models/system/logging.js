const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var APP_CONSTANTS = require('../../utils/App-Constants')

const  loggingSchema = mongoose.Schema({
    username: { type: String, require: true },
    date: {type: Date, require: false, default: Date.now()},
    status: {type: String, require: false, default: 'LOW'},
    message: {type: String, require: false, default: 'system error'},
    expireAt: {type: Date, default: Date.now, index: {expires: APP_CONSTANTS.LOG_EXPIRE_AT}}
})

module.exports = mongoose.model('LOGS', loggingSchema);