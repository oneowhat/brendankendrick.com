

exports.index = function(req, res){
  res.render('resume', { 
    title: 'Brendan Kendrick | Resume',
    nav: 'nav-resume',
    user: req.user  
  });
};
