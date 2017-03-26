var jwt = require("jwt-simple");
var cfg = { jwtSecret: "secret",
            jwtSession: {session: true}
            };
            
module.exports = function(app)
{
	var User = app.models.user;		
	var controller = {};

    controller.login = login;

    function login (req, res) {

        if (req.body.email && req.body.password) {
            var where = {email:req.body.email,password:req.body.password}
          
            User.findOne(where)
    	    .then(function(users){
      	        
      	        if(users){
      			    
      		    var payload = {id: users.id};
                var token = jwt.encode(payload, cfg.jwtSecret);
      
      			res.json({token: token, user: users});
      				
      			}else{
      				res.status(401).json({retorno:"Usuario não encontrado ou senha invalida"});
      			}
    
      		},function(erro){
      			res.status(401).json({retorno:erro});
      		});
    
        } else {
          res.sendStatus(401);
        }
      }
      
      return controller;
};