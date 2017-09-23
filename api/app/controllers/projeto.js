const mongoose = require('mongoose');
const _ = require('underscore');
module.exports = function(app)
{
	const Projeto = app.models.projeto;	
	const emailFeedback = app.lib.emailFeedback;
	const R = app.builder.retorno;	

	async function enviarFeedback(req, res){
		const projeto = req.body.projeto;
		emailFeedback.novo(req.body.projeto.aluno.user);
		return editarEtapa(req, res);
	}

	async function save(req, res){
		try {
			const projeto = req.body;
			console.log('projeto',projeto);
			const query = {"_id":projeto._id};
			const retorno = await Projeto.findOneAndUpdate(query,projeto);
			return R.sucesso(retorno);
		} catch (error) {
			return R.erroServidor(error);
		}	
	};

	async function addEtapa(req, res){
		try {
			const projeto = req.body.projeto.projeto;
			const etapa = req.body.projeto.etapa;
			const query = {"_id":mongoose.Types.ObjectId(projeto._id)};
			const retorno =  await Projeto.findOneAndUpdate(query, {$push:  {'etapas': etapa}},{ upsert: true, new: true });
			return R.sucesso(retorno);
		} catch (error) {
			return R.erroServidor(error);			
		}
	}
	
	async function editarEtapa(req, res){
		try {
			const projeto = req.body.projeto;
			const etapa = req.body.etapa;
			const query = {"_id":mongoose.Types.ObjectId(projeto._id), "etapas._id" :mongoose.Types.ObjectId(etapa._id)};
			const retorno = await Projeto.findOneAndUpdate(query, {'etapas.$': etapa},{ upsert: true, new: true });
			return R.sucesso(retorno);
		} catch (error) {
			return R.erroServidor(error);						
		}
	}
	
	async function delEtapa(req, res){
		try {
			const projeto = req.body.projeto;
			const etapa = req.body.etapa;
			const query = {"_id":mongoose.Types.ObjectId(projeto._id), "etapas._id" :mongoose.Types.ObjectId(etapa._id)};
			const retorno = await Projeto.findOneAndUpdate(query, {$pull: {'etapas': { _id : etapa._id }}} , {new: true });
			return R.sucesso(retorno);
		} catch (error) {
			return R.erroServidor(error);									
		}
	}
	
	async function add(req, res){
		try {
			const projeto = req.body;
			console.log('projeto',projeto)		
			const retorno = await Projeto.create(projeto);
			return R.sucesso(retorno);
		} catch (error) {
			return R.erroServidor(error);												
		}
	}

	async function getByAluno(req, res){
		try {
			const _matriculaAluno  = req.params.matriculaAluno;
			const where = {"aluno.matricula":_matriculaAluno};
			const retorno = await Projeto.findOne(where);
			return R.sucesso(retorno);
		} catch (error) {
			return R.erroServidor(error);															
		}		
	}

	async function getFeedbacks(req, res){
		try {
			const aggregate = {
				$match : { "aluno._id": req.params.id},
				$unwind : "$etapas",
				$group : { _id:null , etapas:{$addToSet:"$etapas"}},
				$project : {_id: false, etapas: true},
			}
			const projeto = await Projeto.aggregate(
				{$match: aggregate.$match},
				{$unwind: aggregate.$unwind},
				{$group: aggregate.$group},
				{$project: aggregate.$project}
			);

			return R.sucesso(builderFeedbacks(projeto));	
		} catch (error) {
			return R.erroServidor(error);			
		}		
	}

	function builderFeedbacks(projeto){
		const feedbacks =  _.flatten(_.map(projeto[0].etapas, etapa =>{		
			return _.map(etapa.feedback, feedback =>{
				return {
						detalhe: feedback.detalhe,
						assunto: feedback.assunto,
						_id: feedback._id,
						envio: feedback.envio,
						etapa: etapa.titulo
					}	
			})
		}));
		return _.sortBy(feedbacks, feedback => feedback.envio).reverse();
	}

	return {save, add, getByAluno, addEtapa, editarEtapa, delEtapa, enviarFeedback, getFeedbacks}	
};