var passport = require('passport');

module.exports = function(app) {
    
   	app.get('auth',passport.authenticate('loca'));

}