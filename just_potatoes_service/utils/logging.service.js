var Logging =  require('../models/system/logging');
var logging = require('../models/system/logging');
var fs = require('fs');
var mail_service = require('./email.service');

module.exports.log = (username, status, message) => {
    logging = new Logging({username: username, status: status, message: "JUST_POTATOES SYSTEM: " + message});
    Logging.create(logging).then(success => {
  }).catch(error => {
      console.log('could not create log', error)  
  })
},

module.exports.email_logs = () => {
  Logging.find().then(logss => {
    var html = this.getHTLMTable(logss);
    fs.writeFile('files/logs.txt', logss, (err) => {
      if(err) {
        //fine! let there be an error
      } else {
        //continue with the plan
        var attach = {
          path: 'files/logs.txt'
        }
        mail_service.send_EMail('', 'LOGS ' , 'FIND THE LOGS ATTACHED FOR: ' + Date.now(), attach, html);
      }
    })
  }).catch(error => {
    //not worried, dont read these anyway
  })
},

module.exports.getHTLMTable = (logss)=> {
  var html = '<html><body><h1>JUST_POTATOES LOGS</h1><hr><table>';
  var table = '';
  table = '<tr><td>DATE</td><td>MESSAGE</td><td>USER</td><td>STATUS</td></tr>';
  logss.forEach(value => {
      table += '<tr>'  + 
                "<td>" + value.date     + "</td>" +
                "<td>" + value.message  + "</td>" +
                "<td>" + value.username + "</td>" +
                "<td>" + value.status   + "</td>" +
               '</tr>';
  });
  html = html + table + '</table></body></html>'
  return html;
}