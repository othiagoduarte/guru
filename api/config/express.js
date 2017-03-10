var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');


module.exports = function()
{
	var app = express();
	
	app.set('host',process.env.IP || "127.0.0.1");
	app.set('port',process.env.PORT || 3008);

	app.use(express.static('./public'));
	
	app.set('view engine','ejs');
	app.set('views','./app/views');
	
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(require('method-override')());

	app.use(cookieParser());

	app.use(session(
		{
			secret: 'homem avestruz',
			resave: true,
			saveUninitialized: true
		}
	));

	app.use(passport.initialize());
	app.use(passport.session());
	
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
	
	return app;
};