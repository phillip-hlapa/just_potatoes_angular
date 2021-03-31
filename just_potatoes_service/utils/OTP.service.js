var OPT = require('../models/system/OTP');
var Logging = require('./logging.service');
var APP_CONSTANTS = require('./App-Constants');
var randomString = require('./generateRandonString');
var User = require('../models/user/user');
var emailService = require('./email.service')

module.exports.createOTP = (userId, email) => {
  console.log("USER EMAIL_ERROR::" + email)
    //create one-time-pin
    var opt = new OPT({
        usernameID: userId,
        generatedPin : randomString.generate()
    });

    OPT.create(opt).then(success =>{
        Logging.log(APP_CONSTANTS.SYSTEM, APP_CONSTANTS.SUCCESSFUL, 'OPT FOR USER: ' + userId + ' CREATED');
        emailService.send_EMail(email, 'ONE-TIME-PIN',
         ':D please use this OTP to verify account: ' + opt.generatedPin + '. expires in ' + APP_CONSTANTS.EXPIRE_AT_IN_MINUTES + " Minutes", null, null);
    }).catch(error => {
        console.log("OTP ERROR:::"+error)
        Logging.log(APP_CONSTANTS.SYSTEM, APP_CONSTANTS.HIGH, error)
    })
},

module.exports.validate = (userid, otp, res) => {
    Logging.log(APP_CONSTANTS.SYSTEM, APP_CONSTANTS.METHOD_EXECUTION, 'VALIDATE')
    OPT.findOne({usernameID: userid, generatedPin: otp}).then(result => {
        if(result) {
            Logging.log(APP_CONSTANTS.SYSTEM, APP_CONSTANTS.SUCCESSFUL, 'OPT FOUND FOR USER ID: ' + userid + " VALIDATING USING OTP...")
            User.findOneAndUpdate({_id: userid}, {$set: {expireAt: null}}).then(info => {
                Logging.log(APP_CONSTANTS.SYSTEM, APP_CONSTANTS.SUCCESSFUL, 'USER VALIDATED USING OTP')
                res.json({message: 'USER VALIDATED USING OTP'})
            }).catch(error => {
                Logging.log(APP_CONSTANTS.SYSTEM, APP_CONSTANTS.SERVERE, error)
            })
        } else {
            Logging.log(APP_CONSTANTS.SYSTEM, APP_CONSTANTS.UNSUCCESSFUL, 'OTP NOT FOUND FOR USER ID: ' + userid)
            res.json({message: 'USER NOT VALIDATED USING OTP'})
        }
    }).catch(error => {
        Logging.log(APP_CONSTANTS.SYSTEM, APP_CONSTANTS.SERVERE, error)
    })
}
