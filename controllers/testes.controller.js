const TestesController = {
	async testeUm(req, res) {
		console.log("A ROTA TESTES ESTÁ FUNCIONANDO");
		return res.status(200).send("pagina ta funcionando!zs");
	},
};

module.exports = TestesController;
