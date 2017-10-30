const mongoose = require('mongoose');
module.exports = function(app)
{
	const ComunicadoBd = app.models.comunicado;		
	const R = app.builder.retorno;

	async function getAll (req, res) {
		try {
			const autores = req.query.autores;
			const retorno = await ComunicadoBd.find({autor:{$in:autores}});
			return R.sucesso(retorno);			
		} catch (error) {
			return R.erroServidor(error);	
		}			
	}
	
	async function save(req, res){
		try {
			const comunicado = req.body;
			const query = {"_id":mongoose.Types.ObjectId(comunicado._id)};
			return R.sucesso(await ComunicadoBd.findOneAndUpdate(query, comunicado,{ upsert: true, new: true }));

		} catch (error) {
			return R.erroServidor(error);				
		}
	}

	async function add(req, res){
		try {
			const comunicado = req.body;
			const retorno = await ComunicadoBd.create(comunicado);
			return R.sucesso(retorno);
			/**Enviar e-mail de aviso!*/			
		} catch (error) {
			return R.erroServidor(error);							
		}
	}
	
	async function del(req, res){
		try {
			const idComunicado = req.params.id;
			const query = {"_id":mongoose.Types.ObjectId(idComunicado)};
			return R.sucesso(await ComunicadoBd.findOneAndRemove(query));
		} catch (error) {
			return R.erroServidor(error);							
		}
	}

	return { getAll, save, add, del}  
}