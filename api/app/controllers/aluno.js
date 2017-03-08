module.exports = function(app)
{
	var Aluno = app.models.aluno;		
	var controller = {};
	
	controller.getAll = getAll; /*BUSCAR TODOS*/ 
	controller.get = get; 		/*BUSCAR POR ID*/
	controller.save = save; /*ATUALIZAR POR ID*/
	controller.add = add;  	/*INSERIR NOVO*/
	controller.getByMatricula = getByMatricula;	/*BUSCAR PELA MATRICULA*/
	
	function get (req, res) {	


	};
	
	function getByMatricula (req, res) {	
		
		var _matricula = req.params.matricula;
		var where = {"matricula": _matricula};

		Aluno.findOne(where)
		.then(function(alunos){
			if(alunos){
				res.status(200).jsonp(alunos);
			}else{
				res.status(404).json({retorno:"Não encontrado"});
			}

		},function(erro){
			res.status(404).json(erro);
		});

	};

	function getAll (req, res) {
		Aluno.find().exec()
		.then(function(alunos){
			res.status(200).jsonp(alunos);
		});
	};
	
	function save(req, res){

	};

	function add(req, res){

	}

	return controller;	
};