var mailer = require('./mailer.js')();
var fs = require('fs');

module.exports = function(app)
{
   return {
        enviar: function(email, senha){
            console.log(email, senha);
            var message = "<h3>Sua senha foi recuperada!<h3>" +
                          "<p>Senha : <b>{{senha}}</b></p> "+ 
                          "<p>Click <a href=\"http://guru-web.herokuapp.com/\"> aqui</a> para acessar!</p>"; 
            //fs.createReadStream('./app/lib/email-template/recuperacao-senha.html');
            var subject = "[GURU] - Recuperação de senha!";
            var to = email;
            console.log(message);
            message = message.replace("{{senha}}", senha);

            mailer.sendMail(to, subject, message);  
        }        
    }
}