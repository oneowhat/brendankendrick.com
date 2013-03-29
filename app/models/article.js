var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]  
  , knox = require('knox');
  
var getTags = function(tags) {
  return tags.join(',');
};

var setTags = function(tags) {
  return tags.split(',');
};
  
var Article = new Schema({
  title: { type: String, default: '', trim: true },
  user: { type: Schema.ObjectId, ref: 'User' },
  content: { type: String },
  tags: { type: [], get: getTags, set: setTags },
  createdAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

Article.path('title').validate(function (title) {
  return title.length > 0;
}, 'Title cannot be blank');

Article.path('content').validate(function (content) {
  return content.length > 0;
}, 'Content cannot be blank');

Article.methods = {
  uploadContentAndSave: function(file, cb) {
    var self = this;
    var knoxClient = knox.createClient(config.s3);
    var s3Headers = {
      'Content-Type': file.type,
      'x-amz-acl': 'public-read'
    };
    knoxClient.putFile(file.path, file.name, s3Headers, function(err, s3Response){
      if (err) return cb(err);
      self.content = knoxClient.https('/'+file.name);
      self.save(cb);
    });
  }
};

Article.statics = {
  load: function (title, cb) {
    title = title.replace(/-/g, " ");
    this.findOne({ title: title }).populate('user', 'name').exec(cb)
  },

  list: function (options, cb) {
    var criteria = options.criteria || {};

    this.find(criteria)
      .populate('user', 'name')
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  }
};

mongoose.model('Article', Article);
