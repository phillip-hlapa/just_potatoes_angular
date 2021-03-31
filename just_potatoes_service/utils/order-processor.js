var APP_CONSTANTS = require('./App-Constants');
var Logging = require('./logging.service');
var Product = require('../models/shop/children/product');

module.exports.calculateTotal = (productsOrdered) => {

    Logging.log("CALCULATING TOTAL", APP_CONSTANTS.METHOD_EXECUTION, "CALCULATING ORDER TOTAL");
    console.log("inside calculate total");
    console.log(productsOrdered);
    var total = 0;
   
    for(i = 0; i < productsOrdered.length; i++) {
        console.log(productsOrdered[i])
        Product.findById(productsOrdered[i]).then(productFound => {
            if(productFound) {
                console.log("product found")
                total = total + parseInt(productFound.product_price);
                console.log(productFound.product_price)
            } else{
                console.log("no such product: " + productId);
            }
        })
    }
    return total;
},

module.exports.getPrice = (id) => {
    if(id) {
        Product.findById(id).then(product => {
            if(product) {
                return product.product_price;
            } else {
                return 0;
            }
        }).catch(err => {
            console.log(err)
        })
    }
}
