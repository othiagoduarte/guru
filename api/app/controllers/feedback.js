module.exports = function(app)
{
	var Feedback = app.models.feedback;		
	var controller = {};
	
	controller.getAll = getAll; /*BUSCAR TODOS*/ 
	controller.get = get; 		/*BUSCAR POR ID*/
	controller.save = save; /*ATUALIZAR POR ID*/
	controller.add = add;  	/*INSERIR NOVO*/

	function get (req, res) {	


	};
 	
	function getAll (req, res) {

		Feedback.find().exec()
		.then(function(feedbacks){
			res.json(feedbacks);
		});
			
	};
	
	function save(req, res){

	};

	function add(req, res){

	}

	return controller;	
};