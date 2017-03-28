module.exports = function(app)
{
	var controller = app.controllers.entrega;
	var auth = app.passportGuru.authenticate();
		
	app.route('/entrega/:id')
	.all(auth)
	.get(controller.get);
	
	app.route('/entrega')
	.all(auth)
	.get(controller.getAll)
	.post(controller.add)
	.put(controller.save);
};