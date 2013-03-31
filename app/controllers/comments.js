
exports.create = function (req, res) {
  var article = req.article;
  var titleParam = article.title.replace(/ /g, "-");
  
  if (!req.body.body) return res.redirect('/articles/'+ titleParam);

  article.comments.push({
    name: req.body.name,
    email: req.body.email,
    url: req.body.url,
    body: req.body.body
  });

  article.save(function (err) {
    // TODO: render comments as result.
    if (err) return res.render('500');
    res.redirect('/articles/' + titleParam);
  });
};
