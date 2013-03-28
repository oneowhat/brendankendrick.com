var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]  
  , knox = require('knox');
  
var Product = new Schema({
  name: { type: String, default: '', trim: true },
  description: { type: String, default: '', trim: true },
  price: { type: Number, min: 0 },
  image: { type: String },
  purchaseUrl: { type: String, default: '', trim: true },
  createdAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

Product.path('name').validate(function (name) {
  return name.length > 0;
}, 'Name cannot be blank');

Product.path('description').validate(function (description) {
  return description.length > 0;
}, 'Description cannot be blank');

Product.path('image').validate(function (image) {
  return image.length > 0;
}, 'You must upload an image');

Product.path('price').validate(function (price) {
  return price > 0;
}, 'Price cannot be 0');

Product.methods = {
  
  uploadImageAndSave: function(image, cb) {
    var self = this;
    var knoxClient = knox.createClient(config.s3);
    var s3Headers = {
      'Content-Type': image.type,
      'x-amz-acl': 'public-read'
    };
    knoxClient.putFile(image.path, image.name, s3Headers, function(err, s3Response){
      if (err) return cb(err);
      self.image = knoxClient.https('/'+image.name);
      self.save(cb);
    });
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
