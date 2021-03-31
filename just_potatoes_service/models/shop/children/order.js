const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var APP_CONSTANTS = require('../../../utils/App-Constants')

const  orderSchema = mongoose.Schema({
    order_by: {type:  Schema.Types.ObjectId, ref: 'User'},
    order_date: {type: Date, require: false, default: Date.now},
    order_total: {type: Number, required: false},
    order_products: [{type:  Schema.Types.ObjectId, ref: 'Product'}],
    order_status: {type: String, required: false, default: "PENDING"}, //PENDING => ACCEPTED/DECLINED => DISPACHED => ARRIVED
    //order_from_shop: [{type:  Schema.Types.ObjectId, ref: 'Shop'}]
    expireAt: {type: Date, default: Date.now, index: {expires: null}}
})

module.exports = mongoose.model('Order', orderSchema);