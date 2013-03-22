
var express = require('express')
  , mongoStore = require('connect-mongo')(express)
  , flash = require('connect-flash')
  , fs = require('fs')
  , http = require('http')
  , path = require('path')
  , passport = require('passport');
  
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , auth = require('./config/auth')
  , mongoose = require('mongoose');

mongoose.connect(config.db);

var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file);
});

require('./config/passport')(passport, config)

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'jade');
  
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser())
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  
  app.use(express.session({
    secret: 'bkejs',
    store: new mongoStore({
      url: config.db,
      collection: 'sessions'
    })
  }));    
  
  app.use(flash())
  
  app.use(passport.initialize());
  app.use(passport.session());
    
  app.use(app.router);
  
  app.use(express.compress({
    filter: function (req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
    },
    level: 9
  }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

require('./config/routes')(app, config, auth);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
