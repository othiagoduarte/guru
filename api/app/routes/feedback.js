module.exports = function(app)
{
	var controller = app.controllers.feedback;
	var auth = app.passportGuru.authenticate();
	
	app.route('/feedback/:id')
	.all(auth)
	.get(controller.get);

	app.route('/feedback')
	.all(auth)
	.get(controller.getAll)
	.get(controller.add)
	.get(controller.save);
};