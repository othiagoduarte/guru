module.exports = function(app)
{
	var controller = app.controllers.professor;
	
	var auth = app.passportGuru.authenticate();
		
	
	app.route('/professor')
	.all(auth)
	.get(controller.getAll)
	.post(controller.add);
	
	app.route('/professor/:id')
	.all(auth)
	.get(controller.get);
	
	app.route('/aluno/getByUser/:user')
	.all(auth)
	.get(controller.getByUser);
};