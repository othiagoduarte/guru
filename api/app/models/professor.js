var mongoose = require('mongoose');

module.exports = function() {

    var schema = mongoose.Schema({  
        nome: {
            type: String,
            required: true
        },
        titulo:  {
            type: String,
            
        },
        skills :[String]
        ,
        disponivel: {
            type:Boolean,
            default:true,            
        },
        vagas:{
            type:Number,
            default:1,
            required: true            
        },
        user:{}
    });

    return mongoose.model('Professores', schema);
};