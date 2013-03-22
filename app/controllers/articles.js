var mongoose = require('mongoose')
  , async = require('async');
  
exports.index = function(req, res, options){
  res.render('articles/index', {
    title: 'Brendan Kendrick | Software Developer',
    message: 'Check back soon for updates on my aduino/node project'
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

