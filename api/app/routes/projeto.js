module.exports = function(app)
{
	var controller = app.controllers.projeto;
	
	app.get('/projeto/:id',controller.get);
	app.get('/projeto/getByAluno/:matriculaAluno',controller.getByAluno);
	app.get('/projeto', controller.getAll);

	app.post('/projeto',controller.add);
	app.put('/projeto',controller.save);
		
};