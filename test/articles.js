/**
 *  Mocha
 */
 
 var assert = require('assert')
   , article = require('../app/models/article')
   , config = require('./config/config')['test']
   , mongoose = require('mongoose');
 
 mongoose.connect(config.db);
 
 describe('article', function() {
 
   var currentArticle = null;
   
   describe('.save', function() {
     beforeEach(function(done) {
       //currentArticle = article.
     });
     it('should save with valid attributes', function() {
       assert(true);
     });
   });
 });
