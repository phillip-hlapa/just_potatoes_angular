var APP_CONSTANTS = require('./App-Constants');

module.exports.generate = () => {
    //method for generating a randon string of length APP_CONSTANTS.STRING_LENGTH
    var value = '';
    var i = 0;
    for (let index = 0; index < APP_CONSTANTS.OTP_LENGTH; index++) {
        i = Math.floor((Math.random() * (APP_CONSTANTS.STRING_LENGTH - 1))  + 1)
        value = value + APP_CONSTANTS.STRING.charAt(i);
    }
    return value;
},

module.exports.generateAuthToken = () => {
    //method for generating a randon string of length APP_CONSTANTS.STRING_LENGTH
    var value = '';
    var i = 0;
    for (let index = 0; index < APP_CONSTANTS.AUTH_TOKEN_LENGTH; index++) {
        i = Math.floor((Math.random() * (APP_CONSTANTS.STRING_LENGTH - 1))  + 1)
        value = value + APP_CONSTANTS.STRING.charAt(i);
    }
    return value + Date.now();
}