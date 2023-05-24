//importação das libs

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// listagem de rotas

const homeRouter = require("./routes/routes");

// iniciar no express

const app = express();

const config = require("./config/config");
const { Sequelize } = require("sequelize");
const conection = new Sequelize(config.development);
const FornecedoresModel = require("./models/fornecedores.model");
const UsuariosModel = require("./models/usuarios.model");

// Inicialização dos models

FornecedoresModel.init(conection);
UsuariosModel.init(conection);

// Associação dos models

FornecedoresModel.associate(conection.models);
UsuariosModel.associate(conection.models);

// Rota base da API

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

// Rotas

app.use("/api", homeRouter);

try {
	app.listen(3000, () => {
		console.log("A API está puvindo em http://localhost:3000");
	});
} catch (error) {
	console.log("Erro ao iniciar o server...");
	console.log(error);
}
