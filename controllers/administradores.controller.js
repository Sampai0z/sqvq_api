const { query } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const AdministradoresModel = require("../models/administradores.model");

const AdminController = {
  async login(req, res) {
    try {
      let { email, password } = req.query;

      if (!email || !password) {
        return res.status(400).send({
          status: 400,
          message: "Envie seus dados corretamente.",
          data: null,
        });
      }

      let admin = await AdministradoresModel.findOne({
        where: {
          email: email,
          role: "admin",
        },
      });

      if (admin) {
        const match = await bcrypt.compare(password, admin.password);

        if (match) {
          const payload = {
            id: admin.id,
            email: admin.email,
            role: admin.role,
          };
          const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1d",
          });

          return res.status(200).json({
            status: 200,
            message: "Login feito com sucesso.",
            token,
            data: admin,
          });
        } else {
          return res.status(401).send({
            status: 401,
            message: "Senha incorreta.",
            data: null,
          });
        }
      } else {
        return res.status(404).send({
          status: 404,
          message: "Administrador não encontrado.",
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
  async cadastrarAdmin(req, res) {
    try {
      const { nome, email, password, telefone, endereco, cidade, cep } =
        req.body;

      if (!nome || !email || !password) {
        return res
          .status(400)
          .json({ message: "Nome, email e senha são obrigatórios." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      let AdministradorExistente = await AdministradoresModel.findOne({
        where: { email: req.body.email },
      });

      if (AdministradorExistente) {
        return res.status(400).send({
          status: 400,
          message: "Já existe um cadastro com esse e-mail ...",
          data: null,
        });
      }

      const novoAdmin = await AdministradoresModel.create({
        nome,
        email,
        password: hashedPassword,
        telefone,
        endereco,
        cidade,
        cep,
      });
      const token = jwt.sign(
        { id: novoAdmin.id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return res.status(200).json({
        message: "Administrador cadastrado com sucesso.",
        data: novoAdmin,
        token: token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao cadastrar admin." });
    }
  },
  async administradorLogado(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
      }

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await AdministradoresModel.findByPk(decoded.id, {
        attributes: { exclude: ["password"] }, // não envia a senha
      });

      if (!user) {
        return res
          .status(404)
          .json({ message: "Administrador não encontrado" });
      }

      return res.json(user);
    } catch (err) {
      return res.status(401).json({ message: "Token inválido ou expirado" });
    }
  },
};

module.exports = AdminController;
