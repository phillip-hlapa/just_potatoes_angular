var Shop = require('../models/shop/shop');
var User = require('../models/user/user');
var APP_CONSTANTS = require('../utils/App-Constants');


module.exports.createShop = (req, res) => {

    var data = req.body;

    User.findOneAndUpdate({"_id": data.shop_owner}, {$set:{role: APP_CONSTANTS.SHOP_OWNER}}, {new: true, 'useFindAndModify': true}, (err, doc) => {
    if (!doc) {
        res.json(APP_CONSTANTS.SHOP_OWNER_ERROR)
    } else {
      newShop = createNewShop(data);
      newShop.save().then(success => {
          res.json(success);
      }).then(error => {
          res.json(error);
      })
    }
});

},
module.exports.getShops = (req, res) => {
    Shop.find().populate(['shop_owner', 'shop_products']).then(shops => {
        res.json(shops);
    }).catch(error => {
        res.json(error);
    })
},

createNewShop = function(data) {
  var newShop = new Shop({
      shop_name: data.shop_name,
      shop_description: data.shop_description,
      shop_owner: data.shop_owner,//data.shop_owner,
      shop_email: data.shop_email,
      shop_cell_number: data.shop_cell_number,
      shop_address: {
          zone: data.zone,
          street: data.street
      },
      shop_products: data.shop_products
  });
  return newShop;
}
