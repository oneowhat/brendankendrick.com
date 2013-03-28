var mongoose = require('mongoose')
  , Article = mongoose.model('Article')
  , async = require('async')
  , _ = require('underscore');
  
exports.new = function(req, res) {
  res.render('articles/new', {
    title: 'New Article',
    article: new Article()
  });
};
  
exports.index = function(req, res, options){
  res.render('articles/index', {
    title: 'Brendan Kendrick | Software Developer',
    message: 'Check back soon for updates on my aduino/node project',
    user: req.user
  });
  
  /*
  Article.list(options, function(err, articles){
    if (err) return res.render('500');
    Article.count().exec(function(err, count){
      res.render('articles/index', {
        title: 'Brendan Kendrick | Software Developer',
        articles: articles
      });
    });
  }); 
  */
};

