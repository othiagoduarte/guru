var mongoose = require('mongoose');

module.exports = function() {

    var schema = mongoose.Schema({  
        titulo: {
            type: String,
        },
        resumo: {
            type: String,
        },
        problema: {
            type: String,
        },
        solucao: {
            type: String,
        },        
        aluno:{
            _id:{type: String},
            nome:{type: String},
            matricula:{type: String},
            user: { email:{type: String},
                    _id:{type: String}
                }
        },
        professor:{            
            _id:{type: String},
            nome:{type: String},
        },
        etapas:[{    
                     titulo: {type: String,required: true},
                      resumo: {type: String,required: true},
                      dataCritica:{ type: Date ,required: true},
                      concluido:{ type: Boolean, default:false},
                      tarefas:[],
                      feedback:[]
                    }                    
                ]
        , segmento:{}
    });

    return mongoose.model('Projetos', schema);
};