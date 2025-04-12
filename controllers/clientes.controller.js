const { DatabaseError } = require("sequelize");
const ClientesModel = require("../models/clientes.model");
const { query } = require("express");

const ClientesController = {
  async testeUm(req, res) {
    return res.status(200).send("pagina ta funcionando");
  },
  async cadastro(req, res) {
    try {
      if (!req.body.nome) {
        return res.status(400).send({
          status: 400,
          message: "Por favor ...",
          data: null,
        });
      }
      console.log(req.body);

      let query = await ClientesModel.create(req.body);

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

  async listarClientes(req, res) {
    try {
      const clientes = await ClientesModel.findAll();
  
      return res.status(200).send({
        status: 200,
        message: "Clientes encontrados com sucesso!",
        data: clientes,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        status: 500,
        message: "Erro ao buscar clientes",
        data: null,
        error: error,
      });
    }
  }

};




module.exports = ClientesController;
