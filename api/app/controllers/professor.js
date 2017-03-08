module.exports = function(app)
{
	var Professor = app.models.professor;		
	var controller = {};
	
	controller.getAll = getAll; /*BUSCAR TODOS*/ 
	controller.get = get; 		/*BUSCAR POR ID*/
	controller.save = save; /*ATUALIZAR POR ID*/
	controller.add = add;  	/*INSERIR NOVO*/

	function get (req, res) {	
		
		var _id = req.params.id;

		Professor.findOne({"_id":_id})
		.then(function(professores){
			res.status(200).json(professores);
		});

	};
 	
	function getAll (req, res) {

		Professor.find().exec()
		.then(function(professores){
			res.json(professores);
		});
			
	};
	
	function save(req, res){

	};

	function add(req, res){
		
		var _professor = req.body;

		Professor.create(_professor)
		.then(function(Professors) {
			res.status(201).json(Professors._doc);
		},
		function(erro) {
			console.log(erro);
		});

	}

	return controller;	
};