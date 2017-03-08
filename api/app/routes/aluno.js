module.exports = function(app)
{
	var controller = app.controllers.aluno;
	
	app.get('/aluno/:id',controller.get);
	app.get('/aluno/byMatricula/:matricula',controller.getByMatricula);
	app.get('/aluno', controller.getAll);
	app.post('/aluno',controller.add);
	app.put('/aluno',controller.save);
};