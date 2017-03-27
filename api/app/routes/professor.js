module.exports = function(app)
{
	var controller = app.controllers.professor;
	
	var auth = app.passportGuru.authenticate();
		
	app.get('/professor',auth, controller.getAll);
	app.get('/professor/:id',auth, controller.get);
	app.post('/professor',auth, controller.add);
	
	app.route('/aluno/getByUser/:user')
	.get(auth, auth, controller.getByUser);
};