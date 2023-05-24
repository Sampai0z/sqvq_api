const FornecedoresModel = require("../models/fornecedores.model");
const { query } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const fornecedoresController = {
	async cadastroFornecedor(req, res) {
		try {
			if (!req.body.nome || !req.body.empresa) {
				return res.status(400).send({
					status: 400,
					message: "Por favor ...",
					data: null,
				});
			}
			let fornecedor = await FornecedoresModel.findOne({
				where: { empresa: req.body.empresa },
			});

			if (fornecedor) {
				return res.status(400).send({
					status: 400,
					message: "Esse fornecedor ja existe no nosso banco de dados.",
					date: null,
				});
			}

			let query = await FornecedoresModel.create(req.body);

			if (query) {
				return res
					.status(200)
					.send({ status: 200, message: "ok", data: query });
			}
		} catch (err) {
			console.error(err);
			return res.status(500).send({
				status: 500,
				message: "algum erro geral",
				data: null,
				error: err,
			});
		}
	},
	async listagem(req, res) {
		return res.status(200).send({ status: 200, message: "ok", data: query });
	},
	async testeUm(req, res) {
		return res.status(200).send("pagina ta funcionando");
	},
};

module.exports = fornecedoresController;
