module.exports = function(app)
{
	var controller = app.controllers.coordenador;
	var auth = app.passportGuru.authenticate();
	
	app.route('/coordenador/:id')
	.all(auth)
	.get(controller.get);
	
	app.route('/coordenador')
	.all(auth)
	.get(controller.getAll)
	.post(controller.add)
	.put(controller.save);
};