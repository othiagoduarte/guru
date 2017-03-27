module.exports = function (app) {
   
   var controller = app.controllers.user;
   
   app.post("/login",controller.login);
   app.get("/user/:id", controller.getById);
};

