module.exports = function(app)
{
	var Orientacao = app.models.orientacao;		
	var controller = {};
	
	controller.getAll = getAll; /*BUSCAR TODOS*/ 
	controller.get = get; 		/*BUSCAR POR ID*/
	controller.save = save; /*ATUALIZAR POR ID*/
	controller.add = add;  	/*INSERIR NOVO*/

	function get (req, res) {	


	};
 	
	function getAll (req, res) {

		Orientacao.find().exec()
		.then(function(orientacoes){
			res.json(orientacoes);
		});
			
	};
	
	function save(req, res){

	};

	function add(req, res){

	}

	return controller;	
};