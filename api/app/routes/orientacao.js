module.exports = function(app)
{
	var controller = app.controllers.orientacao;
	var auth = app.passportGuru.authenticate();
	
	app.route('/orientacao/:id')
	.all(auth)
	.get(controller.get);
	
	app.route('/orientacao')
	.all(auth)
	.get(controller.getAll)
	.post(controller.add)
	.put(controller.save);
};