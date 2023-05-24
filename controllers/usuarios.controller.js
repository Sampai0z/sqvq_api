const UsuariosModel = require("../models/usuarios.model");

const UsuariosController = {
	async testeUm(req, res) {
		return res.status(200).send("pagina ta funcionando");
	},
};

module.exports = UsuariosController;
