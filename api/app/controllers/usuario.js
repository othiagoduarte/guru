module.exports = function(app)
{
	var Usuario = app.models.usuario;		
	var controller = {};
	
	controller.getAll = getAll; /*BUSCAR TODOS*/ 
	controller.get = get; 		/*BUSCAR POR ID*/
	controller.save = save; /*ATUALIZAR POR ID*/
	controller.add = add;  	/*INSERIR NOVO*/

	function get (req, res) {	

		Usuario.find().exec()
		.then(function(contatos){
			res.json(contatos);
		});

	};
 	
	function getAll (req, res) {

		Usuario.find().exec()
		.then(function(contatos){
			res.json(contatos);
		});
			
	};
	
	function save(req, res){

	};

	function add(req, res){

	}

	return controller;	
};