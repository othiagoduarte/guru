var passport = require('passport');
var jwt = require("jwt-simple");

module.exports = function (app) {
   
   var controller = app.controllers.user;
   
   var User =  app.models.user;
   
   app.post("/login",controller.login);
};

