var configAuth = require('./auth');
var passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function() {
    
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });	
}
/*
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;

module.exports = function() {
}      
    passport.serializeUser(function(usuario, done) {
        done(null, usuario._id);
    });
    
    passport.deserializeUser(function(id, done) {
        Usuario.findById(id).exec()
        .then(function(usuario) {
            done(null, usuario);
        });
    });
    
    passport.use(new GoogleStrategy(
        {
            clientID        : configAuth.googleAuth.clientID,
            clientSecret    : configAuth.googleAuth.clientSecret,
            callbackURL     : configAuth.googleAuth.callbackURL,

        }, function(accessToken, refreshToken, profile, done) {
        
            Usuario.findOrCreate(
                { "login" : profile.username},
                { "nome" : profile.username},
                    function(erro, usuario) {
                        if(erro) {
                            console.log(erro);
                        return done(erro);
                        }
                        return done(null, usuario);
                    }
                );
        }
    ));

    function ensureAuthenticated(req, res, next) {
    
        if (req.isAuthenticated()) { return next(); }
            res.redirect('/login')
    }
};

*/