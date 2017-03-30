module.exports = function(app)
{
	var auth = app.passportGuru.authenticate();
	var controller = app.controllers.solicitacao;
	
	app.route('/solicitacao/:id')
	.get(auth ,controller.get);
	
	app.route('/solicitacao')
	.get(auth, controller.getAll)
	.post(auth ,controller.add);
	
	app.route('/solicitacao/ByProfessor/:idProfessor')
	.get(auth, controller.getByProfessor);
};