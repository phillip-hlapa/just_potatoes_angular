var Product = require('../models/shop/children/product');
var APP_CONSTANTS = require('../utils/App-Constants');
var path = require('path');
var fs = require('fs');



module.exports.getAllProducts = (req, res) => {
    Product.find().then(productsResponse => {
        if(productsResponse){
            res.json(productsResponse);
        } else {
            res.json({message: 'found no products'})
        }
    }).catch(err => {
        console.log(err)
    })
},
module.exports.getProduct = (req, res) => {
    Product.findById(req.params.id).then(product => {
        res.json(product);
    }).catch(error => {
        console.log(error)
    })
}
module.exports.createProduct = (req, res) => {
    var data = req.body;
    var  imageData = getImage(APP_CONSTANTS.COMING_SOON_IMAGE);
    var newProduct = new Product({
        product_name: data.product_name,
        product_description: data.product_description,
        product_price: data.product_price,
        product_image : {
          //we need to change this path
          name: data.product_name,
          path: './assets/img/products/'+data.product_name
        }
    });
    newProduct.save().then(success => {
        if(success) {
          var url = "<img src='data:" + success.product_image.contentType + ";base64," + success.product_image.data.toString('base64') + "' alt='some magic' />";
          success.product_image.data = null;
          res.json({
          'image': url,
          'productData': success
        })
        //  res.json(success)
        } else {
          console.log('something wrong happened')
        }
    }).catch(error => {
        res.json(error);
    })
},

getImage = function(fileName) {
  console.log("reading image file");
  var imageData = null;
  try {
      imageData = fs.readFileSync(path.join(__dirname + '/uploads/' + fileName));
  } catch (e) {
      console.log(e);
  } finally {
  }
  return imageData;
}
