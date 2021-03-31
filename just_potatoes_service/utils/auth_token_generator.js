var AuthToken =  require('../models/system/AuthToken');
var generator = require("../utils/generateRandonString")
var Logging = require('../utils/logging.service')
var APP_CONSTANTS = require('../utils/App-Constants');


module.exports.AuthToken = (userid) => {

var token =  generator.generateAuthToken();

newToken =  new AuthToken({
    value: token,
    userid: userid
});

AuthToken.create(newToken).then(tokenResponse => {

console.log("token generated " + tokenResponse)
Logging.log("CREATEUSER", APP_CONSTANTS.METHOD, "TOKEN GENERATED " + tokenResponse);

})
    //create OTP for the user

    return token;
}