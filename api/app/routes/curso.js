module.exports = function(app)
{
	var controller = app.controllers.curso;
	var auth = app.passportGuru.authenticate();
	
	app.get('/curso/:id',controller.get);
	
	app.route('/curso')
	.all(auth)
	.get(controller.getAll)
	.post(controller.add)
	.put(controller.save);
};