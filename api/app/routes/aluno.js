module.exports = function(app)
{
	var controller = app.controllers.aluno;
	var auth = app.passportGuru.authenticate();
	
	
	app.route('/aluno/:id')
	.all(auth)
	.get(controller.get);
	
	app.route('/aluno/getByUser/:user')
	.all(auth)
	.get(controller.getByUser);
	
	app.route('/aluno/byMatricula/:matricula')
	.all(auth)
	.get(controller.getByMatricula);
	
	app.route('/aluno')
	.all(auth)
	.get(controller.getAll)
	.post(controller.add)
	.put(controller.save);

};