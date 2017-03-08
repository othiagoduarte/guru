module.exports = function(app)
{
	var controller = app.controllers.professor;
	
	app.get('/professor', controller.getAll);
	app.get('/professor/:id', controller.get);
	app.post('/professor',controller.add);

};