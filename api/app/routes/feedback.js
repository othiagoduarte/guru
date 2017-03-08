module.exports = function(app)
{
	var controller = app.controllers.feedback;
	
	app.get('/feedback/:id',controller.get);
	app.get('/feedback', controller.getAll);
	app.get('/feedback',controller.add);
	app.get('/feedback',controller.save);
};