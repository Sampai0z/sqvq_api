const { DatabaseError } = require("sequelize");
const EncomendasModel = require("../models/encomendas.model");
const { query } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const encomendasController = {
  async cadastroEncomendas(req, res) {
    try {
      if (!req.body.cliente_id) {
        return res.status(400).send({
          status: 400,
          message: "Por favor ...",
          data: null,
        });
      }

      console.log(req.body);

      let encomenda = await EncomendasModel.findOne({
        where: { cliente_id: req.body.cliente_id },
      });

      if (encomenda) {
        return res.status(400).send({
          status: 400,
          message: "Essa encomenda já existe no nosso banco de dados.",
          date: null,
        });
      }

      let query = await EncomendasModel.create({
        cliente_id: req.body.cliente_id, // <- o id do cliente que veio da outra tabela
        descricao: req.body.descricao,
        status: req.body.status,
        data_entrega: req.body.data_entrega,
        criado_em: new Date(),
      });

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
  async listarEncomendas(req, res) {
    try {
      const encomendas = await EncomendasModel.findAll();
      return res.status(200).send({
        status: 200,
        message: "Encomendas encontrados com sucesso!",
        data: encomendas,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        status: 500,
        message: "Erro ao buscar encomendas",
        data: null,
        error: error,
      });
    }
  },
};

module.exports = encomendasController;
