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
    nav: 'nav-articles',
    article: new Article(),
    popular: [],
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
        nav: 'nav-articles',
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
  Article.popular(5, function(err, popular) {
    res.render('articles/show', {
      title: req.article.title,
      nav: 'nav-articles',
      article: req.article,
      popular: popular,
      user: req.user
    }); 
  });
};

exports.edit = function(req, res) {
  res.render('articles/edit', {
    title: req.article.title,
    nav: 'nav-articles',
    article: req.article,
    popular: [],
    user: req.user
  });
};

exports.update = function(req, res) {
  var article = req.article;
  article = _.extend(article, req.body);  
  
  article.uploadContentAndSave(req.files.content, function(err) {
    if (err) {
      res.render('articles/edit', {
        title: 'Edit Article',
        nav: 'nav-articles',
        article: article,
        errors: err.errors
      });
    } else {
      var titleParam = article.title.replace(/ /g, "-");
      res.redirect('/articles/' + titleParam);
    }
  });
};

exports.setPage = function(req, res, next, page){
  req.page = page;
  next();
};
  
exports.index = function(req, res, options){ 
  var page = req.param("page") > 1 ? req.param("page") : 1;
  var perPage = 5;
  var options = {
    perPage: perPage,
    page: page
  };
 
  Article.list(options, function(err, articles){
    if (err) return res.render('500');
    Article.count().exec(function(err, count){
      Article.popular(5, function(err, popular) {
        res.render('articles/index', {
          title: 'Brendan Kendrick | Articles',
          nav: 'nav-articles',
          articles: articles,
          popular: popular,
          user: req.user,
          page: page,
          pages: count / perPage
        });
      });
    });
  }); 
};

