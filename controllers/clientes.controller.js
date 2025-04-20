const { DatabaseError } = require("sequelize");
const ClientesModel = require("../models/clientes.model");
const { query } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const ClientesController = {
  async listarClientes(req, res) {
    try {
      if (!req.body.admin_id) {
        return res.status(400).send({
          status: 400,
          message: "Por favor ...",
          data: null,
        });
      }

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
  async usuario(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
      }

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await ClientesModel.findByPk(decoded.id, {
        attributes: { exclude: ["password"] }, // não envia a senha
      });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.json(user);
    } catch (err) {
      return res.status(401).json({ message: "Token inválido ou expirado" });
    }
  },

  async cadastro(req, res) {
    try {
      if (!req.body.nome) {
        console.log(req.body.nome, req.body.email);
        return res.status(400).send({
          status: 400,
          message: "Por favor envie seu nome ...",
          data: null,
        });
      }

      let cliente = await ClientesModel.findOne({
        where: { email: req.body.email },
      });

      if (cliente) {
        return res.status(400).send({
          status: 400,
          message: "Já existe um cadastro com esse e-mail ...",
          data: null,
        });
      }

      req.body.password = await bcrypt.hash(req.body.password, 10);

      // GERAR O PAYLOAD DO TOKEN
      const payload = { email: req.body.email };
      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d", // token expira em 7 dias
      });

      let query = await ClientesModel.create(req.body);

      if (query) {
        return res.status(200).send({
          status: 200,
          message: "ok",
          data: query,
          token: token, // retorna o token no response
        });
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

  async login(req, res) {
    try {
      let { email, password } = req.query;

      if (!email || !password) {
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
          const payload = { id: cliente.id, email: cliente.email };
          const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1d",
          });

          return res.status(200).json({
            status: 200,
            message: "Login feito com sucesso.",
            token,
            data: cliente,
          });
        }
      } else {
        return res.status(404).send({
          status: 404,
          message: "Usuário não encontrado.",
          data: null,
        });
      }

      // return res
      //   .status(200)
      //   .json({ message: "Login feito com sucesso.", token});
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ status: 500, message: "Erro geral", data: null });
    }
  },
};

module.exports = ClientesController;
