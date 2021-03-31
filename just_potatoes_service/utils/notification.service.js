var Notification = require('../models/notifications/notification');


module.exports.notify = (message) => {

    notify = new Notification({
        notification_message: message
    });

    Notification.create(this.notify).then(notice => {
        if(notice) {
            console.log(notice);
        } else {
            console.log("could not notify")
        }
    }).catch(err => {
        console.log(err)
    })

}