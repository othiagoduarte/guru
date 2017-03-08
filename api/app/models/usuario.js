var mongoose = require('mongoose');

module.exports = function() {

    var schema = mongoose.Schema({  
        username:  {
            type: String,
            required: true
        },
        password:  {
            type: String,
            required: true
        },
        perfil :   {
            type: String,
            required: true
        },
    });

    return mongoose.model('Usuarios', schema);
};