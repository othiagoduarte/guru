module.exports = function(app)
{
	var Solicitacao = app.models.solicitacao;		
	var controller = {};
	
	controller.getAll = getAll; /*BUSCAR TODOS*/ 
	controller.get = get; 		/*BUSCAR POR ID*/
	controller.save = save; /*ATUALIZAR POR ID*/
	controller.add = add;  	/*INSERIR NOVO*/
	controller.getByProfessor = getByProfessor
	function get (req, res) {	

		Solicitacao.find().exec()
		.then(function(data){
			res.json(data);
		});

	};
 	
	function getAll (req, res) {

		Solicitacao.find().exec()
		.then(function(data){
			res.json(data);
		});
			
	};
	
	function save(req, res){

	};

	function add(req, res){
		
		var _solicitacao = req.body;

		Solicitacao.create(_solicitacao)
		.then(function(solicitacoes) {
			res.status(201).json(solicitacoes._doc);
		},
		function(erro) {
			console.log(erro);
			res.status(501).json(erro.message);
		});
	}

	function getByProfessor(req, res){
		
		var _id = req.params.idProfessor;

		Solicitacao.find({"professor._id":_id})
		.then(function(professores){
			res.status(200).json(professores);
		});
	}

	return controller;	
};