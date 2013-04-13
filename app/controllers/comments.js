
// TODO: delete comments
var helpers = require('view-helpers')
  , sanitize = require('validator').sanitize;

exports.create = function (req, res) {
  var article = req.article;
  var titleParam = article.title.replace(/ /g, "-");
  var name = 'Anonymous';
  
  if (req.body.name.length > 0) {
    name = req.body.name;
  }
  
  if (!req.body.body) return res.send('');
  
  var body = sanitize(req.body.body).xss();

  article.comments.push({
    name: name,
    email: req.body.email,
    url: req.body.url,
    body: body
  });
  
  article.commentCount = article.comments.length;

  article.save(function (err) {
    if (err) return res.render('500');
    var commentDiv = '<div class="comment hidden">';
    commentDiv += '<span class="name">';
    commentDiv += name;
    commentDiv += '</span> wrote:';
    commentDiv += '<div class="page-pad"><p>';
    commentDiv += sanitize(body).escape();
    commentDiv += '</p></div> on '
    commentDiv += res.locals.formatDateTime(req.article.comments[req.article.comments.length - 1].createdAt);
    commentDiv += '</div>';
    res.send(commentDiv);
  });
};
