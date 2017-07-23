module.exports = function (app) 
{
   	const auth = app.passportGuru.authenticate();
    const controller = app.controllers.user;

    app.post("/login", async (req, res) =>{
        const retorno = await controller.login(req, res);
        res.status(retorno.status | 500 ).jsonp(retorno.data);
    });

    app.route("/user/:id")
    .get(controller.getById);

    app.post("/user/recuperar", async (req, res) =>{
        const retorno = await controller.recuperarSenha(req, res);
        res.status(retorno.status | 500 ).jsonp(retorno.data);
    });
};