var jwt = require("jwt-simple");
var cfg = { jwtSecret: "secret",
            jwtSession: {session: true}
            };
            
module.exports = function(app)
{
	var User = app.models.user;		
	var controller = {};

    controller.login = login;
    controller.getById = getById;
    
    function getById(req, res){
        
        if (req.params.id) {
            var _id = req.params.id;
            var where = {_id:_id}
          
            User.findOne(where)
    	    .then(function(users){
      	        
      	        if(users){
      			    res.json({user: users});
      				
      			}else{
      				res.status(404).json({retorno:"Usuario não encontrado"});
      			}
    
      		},function(erro){
      			res.status(404).json({retorno:erro});
      		});
    
        } else {
            res.sendStatus(404);
        }
    }

    function login (req, res) {
        if (req.body.email && req.body.password) {
          var where = {"email" : req.body.email};
            User.findOne(where)
    	    .then(function(users){
      	        
      	        if(users){
                    
                    if(users.password != req.body.password){
                        res.status(401).json({retorno:"Senha inválida"});
                    } 

                    var payload = {id: users.id};
                    var token = jwt.encode(payload, cfg.jwtSecret);
        
                    res.json({token: token, user: users});
      				
      			}else{
      				res.status(401).json({retorno:"Usuario não encontrado"});
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