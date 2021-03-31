const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var APP_CONSTANTS = require('../../utils/App-Constants')

const  otpSchema = mongoose.Schema({
    usernameID: { type: String, require: true },
    generatedPin: { type: String, require: true }, 
    expireAt: {type: Date, default: Date.now, index: {expires: APP_CONSTANTS.OTP_EXPIRE_AT}}
})

module.exports = mongoose.model('OTP', otpSchema);