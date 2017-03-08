module.exports = function(app)
{
	var Projeto = app.models.projeto;		
	var controller = {};
	
	controller.getAll = getAll; /*BUSCAR TODOS*/ 
	controller.get = get; 		/*BUSCAR POR ID*/
	controller.save = save; /*ATUALIZAR POR ID*/
	controller.add = add;  	/*INSERIR NOVO*/
	controller.getByAluno = getByAluno;

	function get (req, res) {	


	};
 	
	function getAll (req, res) {

		Projeto.find().exec()
		.then(function(projetos){
			res.json(projetos);
		});
			
	};
	
	function save(req, res){
		
		var _projeto = req.body;
		var query = {"_id":_projeto._id};

		Projeto.findOneAndUpdate(query,_projeto)
		.then(function(projetos) {
			res.status(200).json(projetos._doc);
		},
		function(erro) {
			console.log(erro);
		});	
	};

	function add(req, res){
		
		var _projeto = req.body;

		Projeto.create(_projeto)
		.then(function(projetos) {
			res.status(201).json(projetos._doc);
		},
		function(erro) {
			res.status(501).json(erro);
			console.log(erro);
		});		
	}

	function getByAluno(req, res){

		var _matriculaAluno  = req.params.matriculaAluno;
		var where = {"aluno.matricula":_matriculaAluno};

		Projeto.findOne(where)
		.then(function(projetos){
			res.status(200).jsonp(projetos);
		},
		function(erro) {
			res.status(501).json(erro);
			console.log(erro);
		});		
	}

	return controller;	
};