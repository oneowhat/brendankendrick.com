var mongoose = require('mongoose')
  , Article = mongoose.model('Article');

exports.index = function (req, res) {
  
  var criteria = { tags: req.param('tag') };
  var page = req.param("page") > 1 ? req.param("page") : 1;
  var perPage = 5;
  var options = {
    perPage: perPage,
    page: page,
    criteria: criteria
  };

  Article.list(options, function(err, articles) {
    if (err) console.log(err);
    Article.count(criteria).exec(function (err, count) {
      Article.popular(5, function(err, popular) {
        res.render('articles/index', {
          title: 'Brendan Kendrick | ' + criteria.tags,
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
