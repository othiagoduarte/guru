module.exports = function(app)
{
	var controller = app.controllers.orientacao;
	
	app.get('/orientacao/:id',controller.get);
	app.get('/orientacao', controller.getAll);
	app.get('/orientacao',controller.add);
	app.get('/orientacao',controller.save);
};