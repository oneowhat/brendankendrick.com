var mongoose = require('mongoose')
  , Article = mongoose.model('Article')
  , fs = require('fs')
  , knox = require('knox')
  , _ = require('underscore');
  
exports.article = function(req, res, next, title){
  Article.load(title, function(err, article){
    if (err) return next(err);
    if (!article) return next(new Error('Failed to load article ' + title));
    req.article = article;
    next();
  });
};
  
exports.new = function(req, res) {
  res.render('articles/new', {
    title: 'New Article',
    article: new Article(),
    user: req.user
  });
};

exports.create = function(req, res) {
  var article = new Article(req.body);
  article.user = req.user;
  article.uploadContentAndSave(req.files.content, function(err) {
    if (err) {
      res.render('articles/new', {
        title: 'New Article',
        article: article,
        errors: err.errors
      });
    } else {
      var titleParam = article.title.replace(/ /g, "-");
      res.redirect('/articles/' + titleParam);
    }
  });
};

exports.show = function(req, res) {
  // TODO: cache article pages
  res.render('articles/show', {
    title: req.article.title,
    article: req.article,
    user: req.user
  }); 
};

exports.edit = function(req, res) {
  res.render('articles/edit', {
    title: req.article.title,
    article: req.article,
    user: req.user
  });
};
  
exports.index = function(req, res, options){  
  Article.list(options, function(err, articles){
    if (err) return res.render('500');
    Article.count().exec(function(err, count){
      res.render('articles/index', {
        title: 'Brendan Kendrick | Software Developer',
        articles: articles,
        user: req.user
      });
    });
  }); 
};

