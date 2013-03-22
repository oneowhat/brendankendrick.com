
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , Imager = require('imager')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env];
  
var Product = new Schema({
  name: { type: String, default : '', trim : true },
  description: { type : String, default : '', trim : true },
  price: { type : Number, min : 0 },
  image: {
    cdnUri: String,
    files: []
  },
  createdAt: { type : Date, default : Date.now }
});

Product.path('name').validate(function (name) {
  return name.length > 0;
}, 'Name cannot be blank');

Product.path('description').validate(function (description) {
  return description.length > 0;
}, 'Description cannot be blank');

Product.path('price').validate(function (price) {
  return price > 0;
}, 'Price cannot be 0');

Product.methods = {
  
  uploadImagesAndSave: function(images, cb) {
    var imager = new Imager(imagerConfig, 'S3');
  }
};

Product.statics = {

  /**
* Find product by id
*
* @param {ObjectId} id
* @param {Function} cb
* @api public
*/

  load: function (id, cb) {
    this.findOne({ _id : id }).exec(cb)
  },

  /**
* List products
*
* @param {Object} options
* @param {Function} cb
* @api public
*/

  list: function (options, cb) {
    var criteria = options.criteria || {};

    this.find(criteria)
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  }
};

mongoose.model('Product', Product);
