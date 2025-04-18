const { DatabaseError } = require("sequelize");
const ClientesModel = require("../models/clientes.model");
const { query } = require("express");
const bcrypt = require("bcrypt");

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
  },

  async login(req, res) {
    try {
      let { email, password } = req.body;

      if (!req.body) {
        return res.status(400).send({
          status: 400,
          message: "Envie seus dados corretamente.",
          data: null,
        });
      } else if (!email) {
        return res
          .status(400)
          .send({ status: 400, message: "Envie o seu email.", data: null });
      } else if (!password) {
        return res
          .status(400)
          .send({ status: 400, message: "Envie sua senha.", data: null });
      }

      let cliente = await ClientesModel.findOne({
        where: {
          email: email,
        },
      });

      if (cliente) {
        // CONTINUA LOGIN
        const match = await bcrypt.compare(password, cliente.password);

        if (match) {
          return res
            .status(200)
            .json({ status: 200, message: "ok", data: cliente });
        } else {
          return res.status(401).json({
            status: 401,
            message: "Usuário não encontrado, tente novamente.",
            data: null,
          });
        }
      } else {
        return res.status(404).send({
          status: 404,
          message: "Usuário não encontrado.",
          data: null,
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ status: 500, message: "Erro geral", data: null });
    }
  },
};

module.exports = ClientesController;
