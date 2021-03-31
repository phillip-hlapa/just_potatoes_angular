var testController = require('./controllers/testController')
var express = require('express');
var route = express.Router();
var testController = require('./controllers/testController')
var UserController = require('./controllers/UserController');
//var ShopController = require('./controllers/ShopController');
var ProductController = require('./controllers/ProductController')
var MessageController = require('./controllers/messageController')
var OrdersController = require('./controllers/OrderContoller')
const { Router } = require('express');

route.get('/test', testController.test);

//user routes
route.get('/users', UserController.getUsers);
route.get('/users/:id', UserController.getUserById);
route.delete('/users/:id', UserController.deleteUser);
route.post('/users/:id/update', UserController.updateUser);
route.post('/users/create', UserController.createUser);
route.post('/users/find', UserController.findUser);
route.post('/users/validate', UserController.validate);

//shop routes
//route.post('/shops/create', ShopController.createShop);
//route.get('/shops', ShopController.getShops);

//product controller
route.post('/products/create', ProductController.createProduct);
route.get('/products', ProductController.getAllProducts);
route.get('/products/:id', ProductController.getProduct);

//orders controller
route.get('/orders', OrdersController.getAllOrders);
route.post('/orders/create', OrdersController.createOrder);
route.delete('/orders/:id', OrdersController.deleteOrder);
route.get('/orders/:id', OrdersController.getOrderById);
route.get('/orders/accept/:id', OrdersController.acceptOrder);
route.get('/orders/decline/:id', OrdersController.declineOrder)
route.get('/orders/reverse/:id', OrdersController.reverseDeclineOrder)
route.get('/orders/dispatch/:id', OrdersController.dispatchOrder);
route.get('/orders/arrive/:id', OrdersController.arrivedOrder);
route.get('/orders/user/:id', OrdersController.getCustomerOrder);

//message routes
route.post('/messages/create', MessageController.createMessage);
route.get('/messages', MessageController.getAllMessages);
route.get('/messages/:id', MessageController.getUserMessages);
route.delete('/messages/:id', MessageController.deleteMessage);
route.post('/messages/text', MessageController.createConversation);

//twitter

route.get('/twitter/followers', UserController.getFollowers)


module.exports = route;
