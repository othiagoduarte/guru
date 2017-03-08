module.exports = function(app)
{
	var controller = app.controllers.skill;
	
	app.route('/skill')
	.get(controller.getAll)
	.post(controller.add)
	.put(controller.save);

	app.route('/skill/:id')
	.get(controller.get);
};