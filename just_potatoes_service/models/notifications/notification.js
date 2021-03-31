const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var APP_CONSTANTS = require('../../utils/App-Constants')

const  notificationsSchema = mongoose.Schema({
    notification_message: {  type: String, require: true },
    notification_date: {type: Date, require: false, default: Date.now},
    expireAt: {type: Date, default: Date.now, index: {expires: APP_CONSTANTS.NOTIFICATION_EXPIRE_AT}}
})

module.exports = mongoose.model('Notifications', notificationsSchema);