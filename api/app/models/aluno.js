var mongoose = require('mongoose');

module.exports = function() {

    var schema = mongoose.Schema({  
        nome: {
            type: String,
            required: true
        },
        matricula:  {
            type: String,
            required: true
        },
        apresentacao:  {
            type: String
        },
        curso: {
            type: {}
        }
    });

    return mongoose.model('Alunos', schema);
};