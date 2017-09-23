const mongoose = require('mongoose');
module.exports = function() {
    return mongoose.model('Orientacoes', mongoose.Schema({  
        assunto: {
            type: String
        },
        aluno:{
            _id:{type: String},
            nome:{type: String},
            user:{},
        },
        professor:{            
            _id:{type: String},
            nome:{type: String},
            user:{},
        },
        envio:{ 
            type: Date, 
            default: Date.now 
        },
        data:{ 
            type: Date 
        },
        local:{
            type: String
        },
        status: {
            type: {} , 
            default:{"cod":"E","descricao":"Enviado"}
        },
        detalhe:{
            type: String
        },
    }));
};