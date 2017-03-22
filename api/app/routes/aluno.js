module.exports = function(app)
{
	var controller = app.controllers.aluno;
	
	app.get('/aluno/:id',verificaAutenticacao,controller.get);
	app.get('/aluno/byMatricula/:matricula',verificaAutenticacao,controller.getByMatricula);
	app.get('/aluno',verificaAutenticacao,controller.getAll);
	app.post('/aluno',verificaAutenticacao,controller.add);
	app.put('/aluno',verificaAutenticacao,controller.save);


	function verificaAutenticacao(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.status('401').json('Não autorizado');
		}
}
};