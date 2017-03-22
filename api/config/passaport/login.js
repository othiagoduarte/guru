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

passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    // verifica no mongo se o nome de usuário existe ou não
    User.findOne({ 'username' :  username },
      function(err, user) {
        // Em caso de erro, retorne usando o método done
        if (err)
          return done(err);
        // Nome de usuário não existe, logar o erro & redirecione de volta
        if (!user){
          console.log('Usuário não encontrado para usuário '+username);
          return done(null, false,
                req.flash('message', 'Usuário não encontrado.'));
        }
        // Usuário existe mas a senha está errada, logar o erro
        if (!isValidPassword(user, password)){
          console.log('Senha Inválida');
          return done(null, false,
              req.flash('message', 'Senha Inválida'));
        }
        // Tanto usuário e senha estão corretos, retorna usuário através 
        // do método done, e, agora, será considerado um sucesso
        return done(null, user);
      }
    );
}));
}