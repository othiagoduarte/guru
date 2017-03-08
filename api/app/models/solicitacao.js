var mongoose = require('mongoose');

module.exports = function() {

    var schema = mongoose.Schema({  
         titulo: {type: String,}
        ,envio:{ type: Date, default: Date.now }
        ,status: {}
        ,aluno: {}
        ,professor: {}
        ,resumo: {type: String}
    });

    return mongoose.model('Solicitacoes', schema);
};