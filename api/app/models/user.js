var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');    

module.exports = function() {

    var schema = mongoose.Schema({  
        username: String,
        password: String,
        email: String,
        gender: String,
        address: String
    });
    
    schema.plugin(findOrCreate);
    
    return mongoose.model('Users', schema);
};