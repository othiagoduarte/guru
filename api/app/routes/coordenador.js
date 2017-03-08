module.exports = function(app)
{
	var controller = app.controllers.coordenador;
	
	app.get('/coordenador/:id',controller.get);
	app.get('/coordenador', controller.getAll);
	app.get('/coordenador',controller.add);
	app.get('/coordenador',controller.save);
};