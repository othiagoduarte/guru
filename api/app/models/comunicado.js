const mongoose = require('mongoose');
module.exports = function() {
    return mongoose.model('Comunicados', mongoose.Schema({  
        titulo: {
            type: String,
            required: true
        },
        comunicado: {
            type: String,
            required: true
        },
        tipo: {
            type: Number ,
            default: 1
        },
        url: {
            type: String
        },
        data:{ 
            type: Date, 
            default: Date.now
        } ,
    }));
};