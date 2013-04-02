var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , fs = require('fs')
  , https = require('https')
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
  comments: [{
    name: { type: String, default: 'Anonymous', trim: true },
    email: { type: String, default: '', trim: true },
    url: { type: String, default: '', trim: true },
    body: { type: String, default: '' },
    createdAt: { type : Date, default : Date.now }
  }],
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
    fs.readFile(file.path, function (err, data) {
      if (err) return cb(err);
      self.content = data.toString();
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
