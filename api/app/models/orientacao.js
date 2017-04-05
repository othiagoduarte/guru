var mongoose = require('mongoose');

module.exports = function() {

    var schema = mongoose.Schema({  
        assunto: {type: String},
        aluno:{},
        professor:{},
        envio:{ type: Date, default: Date.now },
        data:{ type: Date },
        local:{type: String},
        status: {type: {} , default :{"cod":"E","descricao":"Enviado"}},
        detalhe:{type: String},
    });

    return mongoose.model('Orientacoes', schema);
};