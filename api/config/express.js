var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var expressSession = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('../app/models/account.js');	

module.exports = function()
{
	var app = express();
	
	app.set('host',process.env.IP || "127.0.0.1");
	app.set('port',process.env.PORT || 3008);

	app.use(express.static('./public'));
	app.use(express.static(__dirname + '/public'));

	
	app.set('view engine','ejs');
	app.set('views','./app/views');
	
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(require('method-override')());
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(cookieParser());
	app.use(expressSession({secret: 'guru_db'}));

	
	app.use(function(req, res, next){
	  res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
	  next();   
	});

	load('models',{cwd: 'app'})
	.then('controllers')
	.then('routes')
	.into(app);
	
	/*PASSAPORT - INICIO*/
	passport.use(new LocalStrategy(
		function(){
			
		}	
	));
	
	passport.serializeUser(
		function(user, done) {
    		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
	    Account.findById(id, function(err, user) {
	            done(err, user);
	        });
	    });	
	/*PASSAPORT - FIM*/

	return app;
};