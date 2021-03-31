var logging = require('./logging.service');
var APP_CONSTANTS = require('./App-Constants');
var mongoose = require('mongoose')
var emailService =  require('./email.service');

module.exports.connect = () => {
    try {
        mongoose.connect(APP_CONSTANTS.DATABASE_URL, {useNewUrlParser: true,  useUnifiedTopology: true}, (error) => {
            console.log(error)
            emailService.send_EMail(APP_CONSTANTS.MY_PERSONAL_EMAIL_ADDRESS, APP_CONSTANTS.SYSTEM, APP_CONSTANTS.DATABASE_SUCCESS_CONNECTION, null, null);
        });
        logging.log(APP_CONSTANTS.SYSTEM, APP_CONSTANTS.SUCCESSFUL, APP_CONSTANTS.DATABASE_SUCCESS_CONNECTION)
    } catch (error) {
        console.log(error)
        emailService.send_EMail(APP_CONSTANTS.MY_PERSONAL_EMAIL_ADDRESS, APP_CONSTANTS.SYSTEM, APP_CONSTANTS.DATABASE_FAILURE_CONNECTION + ' : ' + error, null, null);
    }

}
