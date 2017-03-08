module.exports = function(app)
{
	var controller = app.controllers.usuario;
	
	app.get('/usuario/:id',controller.get);
	app.get('/usuario', controller.getAll);
	app.get('/usuario',controller.add);
	app.get('/usuario',controller.save);
};