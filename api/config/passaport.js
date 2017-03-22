var configAuth = require('./auth');
var passport = require('passport');

/*
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
*/

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function() {

    var Usuario = app.models.usuario;
       
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(obj, done) {
        Usuario.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use(new GoogleStrategy(
        {
            clientID        : configAuth.googleAuth.clientID,
            clientSecret    : configAuth.googleAuth.clientSecret,
            callbackURL     : configAuth.googleAuth.callbackURL,

        },
        function(identifier, profile, done) {
        // asynchronous verification, for effect...
            process.nextTick(function () {
                
                // To keep the example simple, the user's Google profile is returned to
                // represent the logged-in user.  In a typical application, you would want
                // to associate the Google account with a user record in your database,
                // and return that user instead.
                profile.identifier = identifier;
                return done(null, profile);
                });
            }    
    ));

    function ensureAuthenticated(req, res, next) {
    
    if (req.isAuthenticated()) { return next(); }
        res.redirect('/login')
    }
};

