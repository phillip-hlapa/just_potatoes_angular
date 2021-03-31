const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var APP_CONSTANTS = require('../../../utils/App-Constants')

const  productSchema = mongoose.Schema({
    product_name: { type: String, require: true },
    product_description: { type: String, require: false },
    product_price: { type: String, require: false, default: '0.0' },
    product_currency: { type: String, require: false, default: 'R' },
    product_image: {
      name: {
        type: String
      },
      path: {
        type: String
      } }
})

module.exports = mongoose.model('Product', productSchema);
