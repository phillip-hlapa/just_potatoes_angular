var APP_CONSTANTS = require('./App-Constants');
var Logging = require('./logging.service');
var nodemailer = require('nodemailer');


module.exports.send_EMail = (to_user, user_subject, message, attach, html_1) => {
    Logging.log(APP_CONSTANTS.METHOD, APP_CONSTANTS.METHOD_EXECUTION, "SEND_EMAIL")
    var transport = nodemailer.createTransport({
        service: 'godaddy',
        auth: {
            user: APP_CONSTANTS.EMAIL_USERNAME,
            pass: APP_CONSTANTS.PASSWORD
        }
    });
    var mailOptions = null;

    if(attach && !html_1) {
        Logging.log(APP_CONSTANTS.METHOD, APP_CONSTANTS.INFO, "THIS E-MAIL HAS ATTACHEMENTS")
        mailOptions = {
            from: APP_CONSTANTS.EMAIL_USERNAME,
            to: APP_CONSTANTS.MY_PERSONAL_EMAIL_ADDRESS,
            subject: user_subject,
            text: message,
            attachments: [
                {
                    file: attach.filename,
                    path: attach.path
                }
            ]
        }
    } else if (html_1 && !attach){
        Logging.log(APP_CONSTANTS.METHOD, APP_CONSTANTS.INFO, "THIS E-MAIL HAS ATTACHEMENTS")
        mailOptions = {
            from: APP_CONSTANTS.EMAIL_USERNAME,
            to: APP_CONSTANTS.MY_PERSONAL_EMAIL_ADDRESS,
            subject: user_subject,
            text: message,
            html: html_1,
        }
    } else if (html_1 && attach) {
        Logging.log(APP_CONSTANTS.METHOD, APP_CONSTANTS.INFO, "THIS E-MAIL HAS ATTACHEMENTS")
        mailOptions = {
            from: APP_CONSTANTS.EMAIL_USERNAME,
            to: APP_CONSTANTS.MY_PERSONAL_EMAIL_ADDRESS,
            subject: user_subject,
            text: message,
            html: html_1,
            attachments: [
                {
                    file: attach.filename,
                    path: attach.path
                }
            ]
        }
    } else {
      console.log("TO-USER:::"+to_user);
      console.log("TO-MAIL:::"+APP_CONSTANTS.EMAIL_USERNAME);
        mailOptions = {
            from: APP_CONSTANTS.EMAIL_USERNAME,
            to: to_user,
            subject: user_subject,
            text: message
        };
    }
         try {
             Logging.log(APP_CONSTANTS.EMAIL, APP_CONSTANTS.OPERATION, 'TRYING TO SEND MAIL....:')
             transport.sendMail(mailOptions, function(error, info) {
               if(error) {
                 console.log("02" + error);
                 Logging.log(APP_CONSTANTS.EMAIL, APP_CONSTANTS.UNSUCCESSFUL, error)
             } else {
                 Logging.log(APP_CONSTANTS.EMAIL, APP_CONSTANTS.SUCCESSFUL, info)
                 }
        })
        } catch (error) {
          console.log("01" + error);
             Logging.log(APP_CONSTANTS.EMAIL, APP_CONSTANTS.SERVERE, error)
         }

}
