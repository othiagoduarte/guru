var http = require('http');
var app = require('./config/express')();
require('./config/database.js')('mongodb://localhost/gurudb');
//require('./config/passport')();

http.createServer(app).listen(app.get('port'),app.get('host'),function(){
    console.log('Express running in port: ' + app.get('port'));
	console.log('Express running in host: ' + app.get('host'));
    
});