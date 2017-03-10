var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;

module.exports = function() {
       
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);  
    });
    
    passport.use(new GoogleStrategy(
        {
            returnURL: 'http://localhost:3000/auth/google/return',
            realm: 'http://localhost:3000/'
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

