module.exports = function(app)
{
	var controller = app.controllers.contato;
	var auth = app.passportGuru.authenticate();

	app.route('/contato')
	.all(auth)
	.get(controller.getAll)
	.post(controller.add)
	.put(controller.save);
	
	app.route('/contato/:id')
	.all(auth)
	.get(controller.get);

};