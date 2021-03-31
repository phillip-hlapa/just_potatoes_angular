const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var APP_CONSTANTS = require('../../utils/App-Constants')

const  shopSchema = mongoose.Schema({
    shop_name: { type: String, require: true },
    shop_description: {type: String, require: true},
    shop_owner: {type:  Schema.Types.ObjectId, ref: 'User' },
    shop_email: {type: String, require: true},
    shop_cell_number:{type: Number, require: true},
    shop_address: {
        zone: {
            type: String,
            required: true,
            default: 'ZONE 4'
        },
        street : {
            type: String,
            required: true,
            default: 'Immink Drive'
        },
    },
    shop_orders: [{type:  Schema.Types.ObjectId, ref: 'Oder'}],
    shop_products: [{type:  Schema.Types.ObjectId, ref: 'Product'}]
    // expireAt: {type: Date, default: Date.now, index: {expires: APP_CONSTANTS.USER_EXPIRE_AT}}
})



module.exports = mongoose.model('SHOP', shopSchema);
