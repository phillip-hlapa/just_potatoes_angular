
var User = require('../models/user/user')
var Logging = require('../utils/logging.service')
const bcrypt = require('bcrypt');
var APP_CONSTANTS = require('../utils/App-Constants');
var OPT = require('../utils/OTP.service');
var mailService = require('../utils/email.service')
var schedule = require('node-schedule');
var tokenGen = require('../utils/auth_token_generator')
var twitter = require("twitter");
var j = schedule.scheduleJob(APP_CONSTANTS.AUTO_SEND_LOGS, function() {
   Logging.email_logs();
});


module.exports.getFollowers = (req, res) => {

}
//create user method
module.exports.createUser = (req, res) => {
   Logging.log("CREATEUSER", APP_CONSTANTS.METHOD, APP_CONSTANTS.METHOD_EXECUTION);
   var data = req.body;
   var create = false;
   //create user
   var password = "";
   bcrypt.hash(data.password, APP_CONSTANTS.SALT_ROUNDS, function(err, hash) {
      //Store hash in your password DB.
      password = hash;
  });

  User.findOne({username: data.username}).then(user =>{
     console.log(user)
     if(!user) {
        create = true;
        Logging.log(APP_CONSTANTS.SYSTEM, APP_CONSTANTS.SUCCESSFUL, "USERNAME CAN BE USED! USERNAME: " + data.username);
     } else {
        Logging.log(APP_CONSTANTS.SYSTEM, APP_CONSTANTS.UNSUCCESSFUL, "USERNAME EXISTS, CAN'T BE USED: " + data.username);
        create = false;
     }
  }).catch(error => {
      Logging.log(APP_CONSTANTS.SYSTEM, APP_CONSTANTS.SERVERE, error);
  })
   //save new user
   setTimeout(() => {
      if (create) {
         Logging.log(APP_CONSTANTS.SYSTEM, APP_CONSTANTS.OPERATION, "CREATING USER... " + data.username);
         newUser = new User({
            username: data.username,
            password: password,
            contact: {
               email: data.email,
               cell_number: data.cell_number,
            },
            address: {
               street_name: data.street_name,
               house_number: data.house_number,
               zone: data.zone
            }
            
            
           });
         User.create(newUser).then(success => {
            //create OTP for the user
            console.log("SAVED USER" + success);
            OPT.createOTP(success._id, data.email);
            Logging.log(APP_CONSTANTS.SYSTEM, APP_CONSTANTS.SUCCESSFUL, "USER CREATED: " + newUser.username);
            mailService.send_EMail(data.email, 'REGISTRATION', 'user: ' + success.username + ' has been created on the JUS_POTATOES SYSTEM, awaiting validation', null, null);
            res.json(success);
         }).catch(error => {
            Logging.log(APP_CONSTANTS.SYSTEM, APP_CONSTANTS.SERVERE, error);
            res.json(error);
         })
      } else {
         res.json({message: 'USERNAME EXISTS'})
      }
   }, 3000);
},



//get all users
module.exports.getUsers = (req, res) => {
   Logging.log("GETUSERS", APP_CONSTANTS.METHOD, APP_CONSTANTS.METHOD_EXECUTION);
   User.find().then(users => {
      if(users) {
         Logging.log(APP_CONSTANTS.SYSTEM, APP_CONSTANTS.SUCCESSFUL, "USERS FOUND!");
         res.json(users);
      } else {
         Logging.log(APP_CONSTANTS.SYSTEM, APP_CONSTANTS.HIGH, "USERS NOT FOUND!");
         res.json({message: 'USERS NOT FOUND'})
      }
   }).catch(error => {
      Logging.log(APP_CONSTANTS.SYSTEM, APP_CONSTANTS.SERVERE, error);
   })

},


//get user by id
module.exports.getUserById = (req, res) => {
   Logging.log("GETUSERBYID", APP_CONSTANTS.METHOD, APP_CONSTANTS.METHOD_EXECUTION);
   var id = req.params.id;
   Logging.log(APP_CONSTANTS.SYSTEM, APP_CONSTANTS.OPERATION, "LOOKING FOR USER");
   User.findById(id).then(user => {
      if (!user) {
         Logging.log(APP_CONSTANTS.SYSTEM, "USER NOT FOUND, WITH ID : " + id);
         res.json({message: "USER NOT FOUND"})
      } else {
         Logging.log(APP_CONSTANTS.SYSTEM, APP_CONSTANTS.SUCCESSFUL, "USER FOUND : " + user.username);
         res.json(user)
      }
   }).catch(error => {
      Logging.log(APP_CONSTANTS.SYSTEM, APP_CONSTANTS.SERVERE, error);
   })
},

//update user
module.exports.updateUser = (req, res) => {
   Logging.log("UPDATEUSER", APP_CONSTANTS.METHOD, APP_CONSTANTS.METHOD_EXECUTION);
   var id = req.params.id;
   var user = new User({

   });
},

//delete user by id
module.exports.deleteUser = (req, res) => {

   var id = req.params.id;
   Logging.log("DELETE USER", APP_CONSTANTS.METHOD, APP_CONSTANTS.METHOD_EXECUTION);
   User.findByIdAndDelete(id).then(deletedUser => {
      if(deletedUser) {
         Logging.log("USER DELETED: " + deletedUser.username, APP_CONSTANTS.METHOD, APP_CONSTANTS.METHOD_EXECUTION);
         res.json(deletedUser);
      } else {
         Logging.log("USER NOT FOUND TO DELETE", APP_CONSTANTS.METHOD, APP_CONSTANTS.METHOD_EXECUTION);
         res.json({message: "USER NOT FOUND TO DELETE"});
      }
      
   }).catch(err => {
      Logging.log("ERROR OCCURED WHILE DELETING USER " + err, APP_CONSTANTS.METHOD, APP_CONSTANTS.METHOD_EXECUTION);
      console.log(err)
      res.json({message: "USER NOT FOUND TO DELETE: " + id})
   })

},

//update user
module.exports.updateUser = (req, res) => {

},

//i will be using this to log in
//find user by using username. unique
module.exports.findUser = (req, res) => {
   Logging.log("GETUSER", APP_CONSTANTS.METHOD, APP_CONSTANTS.METHOD_EXECUTION);
   var data = req.body;
   var username = data.username;
   var password = data.password;

   User.findOne({username:username}).then(user => {
      if(!user) {
         Logging.log(username, APP_CONSTANTS.HIGH, "USER NOT FOUND");
         res.json({message: 'NOT FOUND'})
      } else {
         Logging.log(username, APP_CONSTANTS.SUCCESSFUL, "USER FOUND");
         var isMatch = false;
         bcrypt.compare(password, user.password).then(function(result) {
            isMatch = result;
         });
         setTimeout(() => {
           var token = tokenGen.AuthToken(user._id);
           console.log("hello? " + token)
           res.set({"x-jus-potatoes-auth-token": token}); 
           res.json({message: isMatch, role: user.role, userId: user._id})
         }, 4000);

      }

   }).catch(error => {
      Logging.log(APP_CONSTANTS.SYSTEM, APP_CONSTANTS.SERVERE, error);
      res.json(error)
   })
},


//validate user that has been created
module.exports.validate = (req, res) => {
   Logging.log('VALIDATE', APP_CONSTANTS.METHOD, APP_CONSTANTS.METHOD_EXECUTION);
   var userid = req.body.userid;
   var otp = req.body.otp;
   OPT.validate(userid, otp, res);
}
