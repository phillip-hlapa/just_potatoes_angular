var APP_CONSTANTS = require('../utils/App-Constants');
var OrderProcessor = require('../utils/order-processor');
var Order = require('../models/shop/children/order');
var Logging = require('../utils/logging.service')
var Notify = require('../utils/notification.service');
var mailService = require('../utils/email.service')
var User = require('../models/user/user');
const {send_EMail} = require("../utils/email.service");




module.exports.createOrder = (req, res) => {

    Logging.log("CREATE_ORDER", APP_CONSTANTS.METHOD, APP_CONSTANTS.METHOD_EXECUTION);
    var orderData = req.body;
    console.log("----------------------------------------------------------------->")
    console.log(req.body)
    console.log("----------------------------------------------------------------->")
    console.log(orderData)
    if(orderData) {


        console.log(orderData)
        newOrder = new Order({
            order_by: orderData.order_by,
            order_products: orderData.order_products,
            order_total: orderData.order_total
        });

        setTimeout(() => {

        console.log(newOrder)
            newOrder.save(newOrder).then(createdOrder => {
                if(createdOrder) {
                    this.getOrderSlip(orderData.order_by, createdOrder._id);

                    Logging.log("ORDER_CREATED", APP_CONSTANTS.SUCCESSFUL, APP_CONSTANTS.METHOD_EXECUTION);
                    res.json(createdOrder);
                } else {
                    //Logging.log("ORDER_NOT_CREATED", APP_CONSTANTS.INFO, APP_CONSTANTS.METHOD_EXECUTION);
                }
    
            }).catch(err => {
                console.log(err);
                Logging.log("CREATE_ORDER", APP_CONSTANTS.SERVERE, APP_CONSTANTS.METHOD_EXECUTION);
            }); 
        }, 3000);
       //Notify.notify("order has been created by on the system" )
    } else {
        Logging.log("CREATE_ORDER => NO ORDER SENT THROUGH", APP_CONSTANTS.SERVERE, APP_CONSTANTS.METHOD_EXECUTION);
    }


},

module.exports.getAllOrders = (req, res) => {


    Order.find().populate(['order_by', 'order_products']).then(orders => {
        if(orders) {
            //Notify.notify("all orders received" )
            res.json(orders);
        } else {
            res.json({message: "no orders found"})
        }
    })

}

module.exports.deleteOrder = (req, res) => {

    var orderId = req.params.id;

    Order.findByIdAndDelete(orderId).then(deletedOrder => {
        if(deletedOrder){
            res.json(deletedOrder);
        } else{
            res.json({message: "could not delete order"})
        }
    }).catch(err => {
        console.log(err);
    })

},

module.exports.acceptOrder = (req, res) => {

    var orderId = req.params.id;

    Order.findOneAndUpdate({"_id": orderId}, {$set:{order_status: 'ACCEPTED'}}, {new: true, 'useFindAndModify': true}, (err, doc) => {
        if (!doc) {
            res.json({message: "could not find specified order: " + orderId})
        } else {
            res.json(doc)
        }
    });

}

module.exports.declineOrder = (req, res) => {

    var orderId = req.params.id;

    Order.findOneAndUpdate({"_id": orderId}, {$set:{order_status: 'DECLINED', expireAt: APP_CONSTANTS.DECLINDED_ORDER_EXPIRE_AT}}, {new: true, 'useFindAndModify': true}, (err, doc) => {
        if (!doc) {
            res.json({message: "could not find specified order: " + orderId})
        } else {
            res.json(doc)
        }
    });

},

module.exports.reverseDeclineOrder = (req, res) => {

    var orderId = req.params.id;

    Order.findOneAndUpdate({"_id": orderId}, {$set:{order_status: 'ACCEPTED', expireAt: null}}, {new: true, 'useFindAndModify': true}, (err, doc) => {
        if (!doc) {
            res.json({message: "could not find specified order: " + orderId})
        } else {
            res.json(doc)
        }
    });

},

module.exports.dispatchOrder = (req, res) => {

    var orderId = req.params.id;

    Order.findOneAndUpdate({"_id": orderId}, {$set:{order_status: 'DISPATCHED'}}, {new: true, 'useFindAndModify': true}, (err, doc) => {
        if (!doc) {
            res.json({message: "could not find specified order: " + orderId})
        } else {
            res.json(doc)
        }
    });

},


module.exports.arrivedOrder = (req, res) => {

    var orderId = req.params.id;

    Order.findOneAndUpdate({"_id": orderId}, {$set:{order_status: 'ARRIVED'}}, {new: true, 'useFindAndModify': true}, (err, doc) => {
        if (!doc) {
            res.json({message: "could not find specified order: " + orderId})
        } else {
            res.json(doc)
        }
    });

},

module.exports.getOrderById = (req, res) => {

    var orderId =  req.params.id;

    if(orderId){
        Order.findById(orderId).populate(['order_by', 'order_products']).then(requestedOrder => {
            if(requestedOrder) {
                res.json(requestedOrder)
            } else{
                res.json({message: "could not find order"})
            }
        }).catch(err => {
            console.log(err);
        })
    }

},
module.exports.getCustomerOrder = (req, res) => {

    var userId = req.params.id;
    
    Order.find({"order_by": userId}).populate(['order_by', 'order_products']).then(userOrder => {

        if(userOrder) {
            res.json(userOrder);
        } else {
            res.json({message: "could not find user order"})
        }

    }).catch(err => {
        console.log(err)
    });
},
module.exports.getOrderSlip = (userid, orderId) => {
    setTimeout(() => {
        let orderedUser = this.getOrderedUser(userid)
        let buildSlipResult = this.buildSlip(orderId, orderedUser);
        console.log(buildSlipResult)
    }, (3000));
}

module.exports.getOrderedUser = (userId) => {
    console.log('user id: ' + userId)
    console.log("HELLO ORDER 2")
    User.findById(userId).then(orderedUser => {
        console.log("HELLO ORDER 3")
        console.log(orderedUser)
        return orderedUser
    }).catch(err => {
        console.log(err);
    })
}
module.exports.getOrderedUserOrderDetails = (orderId) => {
    console.log('order id: ' + orderId)
    let OrderResult = null;
    Order.findById(orderId).populate(['order_by', 'order_products']).then(requestedOrder => {
        console.log(requestedOrder)
        return  requestedOrder
    }).catch(err => {
        console.log(err);
    })
    console.log(OrderResult)
}
module.exports.buildSlip = (orderId,  orderedUser) => {
    console.log('SLIP_BUILD_PROCESS')
    console.log('ORDER_ID ' + orderId)
    let table = '';
    Order.findById(orderId).populate(['order_by', 'order_products']).then(requestedOrder => {
        let list = '';
        table = '<h1> <u>Thanks for your Order, Jus"Potatoes!</u></h1>  <br />   <br /> <table>'
            +'<tr>'
            +'<th>Ordered Item</th>'
            +'<th>Product Description</th>'
            +'<th>Price</th>'
            +'</tr>'

        for(let i = 0; i < requestedOrder.order_products.length; i++) {
            list += '<tr>'
            list += '<td></ul>'  + requestedOrder.order_products[i].product_name         +  '</ul></td>';
            list += '<td><ul>'   + requestedOrder.order_products[i].product_description  + '</ul></td>';
            list += '<td></ul>R' + requestedOrder.order_products[i].product_price        + '<ul></td>';
            list += '</tr>'
        }
        table = table + list;
        table = table + '<br /> <tr><u> ORDER TOTAL: R' + requestedOrder.order_total     + '</u></tr>';

        table += '</table>';
        console.log(table)
        send_EMail(requestedOrder.order_by.contact.email, 'SLIP', 'PLEASE FIND ATTACHED ORDER INFO', null, table);
    }).catch(err => {
        console.log(err);
    })
    ;

}
