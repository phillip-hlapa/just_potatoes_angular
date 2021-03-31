var Message = require('../models/message/message');
var Text = require('../models/message/text');
var User = require('../models/user/user');
var APP_CONSTANTS = require('../utils/App-Constants');



module.exports.createMessage = (req, res) => {
    var data = req.body;
    console.log(data);
    if(data) {
        var newMessage = new Message({
          sender: data.sender,
          messageHeader: data.message_header,
          message: data.message
        });
        newMessage.save().then(savedMessage => {
          if(savedMessage) {
            res.json(savedMessage)
          } else {
            res.json("message could not be persisted to db")
          }
        }).catch(err => {
          res.json("could not save message::"+err)
        })
    } else {
      console.log("no data");
    }
},

module.exports.getAllMessages = (req, res) => {
  Message.find().populate(['sender', 'textMessages']).then(messages => {
    if(messages) {
      res.json(messages)
    } else {
      res.json("could not get messages from db")
    }
  }).catch(error => {
    res.json("error occured on this endpoint" + error)
  })
},

module.exports.getUserMessages = (req, res) => {
  var id = req.params.id;

  Message.find({"sender":id}).populate(['sender', 'textMessages']).then(messages => {
    if(messages) {
      res.json(messages)
    } else {
      res.json("could not get messages from db")
    }
  }).catch(error => {
    res.json("error occured on this endpoint" + error)
  })
},

module.exports.createConversation = (req, res) => {
    var data = req.body;
    if(data) {
      Message.findById(data.messageId).then(message => {
        if(message) {
          console.log("message exist" + message)
         var txt = new Text({
             text: data.text
         });
         txt.save().then(savedTxt => {
           Message.findOneAndUpdate({ _id: data.messageId}, { $push: { textMessages: savedTxt._id }}).then(updatedMessage => {
             res.json(updatedMessage);
           });
         })
        } else {
          console.log("message does not exist" + message)
        }
      })
    } else {
      res.json("request data null")
    }

},
module.exports.deleteMessage = (req, res) => {
  var id = req.params.id;
  Message.findByIdAndDelete(id).then(deletedMessage => {
    if(deletedMessage) {
      res.json(deletedMessage);
    } else{
      console.log("could not delete message");
      res.json({message: "could not delete message"});
    }
  })
}
