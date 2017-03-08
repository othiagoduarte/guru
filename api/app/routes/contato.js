module.exports = function(app)
{
	var controller = app.controllers.contato;
	/*
	app.get('/contato/:id',controller.get);

	app.get('/contato', controller.getAll);
	app.get('/contato',controller.add);
	app.get('/contato',controller.save);
	*/
	app.get('/contato', controller.getAll);


};