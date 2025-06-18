require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// LISTAGEM DE ROTAS
const homeRouter = require("./routes/routes");

// START NO EXPRESS
const app = express();

const config = require("./config/config");
const { Sequelize } = require("sequelize");
const AdministradoresModel = require("./models/administradores.model");
const ClientesModel = require("./models/clientes.model");
const PedidoModel = require("./models/pedidos.model");
const ItemPedidoModel = require("./models/itemPedido.model");
const ProdutoModel = require("./models/produto.model");
const conection = new Sequelize(config.development);

//root:gQjNZqeNfVjFxqIiIEAzTVNmKsoXVGQF@ballast.proxy.rlwy.net:25984/railway

// INICIALIZAÇÃO DOS MODELS

mysql: AdministradoresModel.init(conection);
ClientesModel.init(conection);
ProdutoModel.init(conection);
PedidoModel.init(conection);
ItemPedidoModel.init(conection);

// ASSOCIAÇÃO DOS MODELS
AdministradoresModel.associate(conection.models);
ClientesModel.associate(conection.models);
PedidoModel.associate(conection.models);
ItemPedidoModel.associate(conection.models);
ProdutoModel.associate(conection.models);

// ROTA BASE DA API
app.use(cors()); // ATIVA O CORS
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

//ROTAS
app.use("/api", homeRouter);

try {
  app.listen(process.env.PORT || 3000, () => {
    console.log("A API está ouvindo em http://localhost:3000");
  });
} catch (error) {
  console.log("Erro ao iniciar server...");
  console.log(error);
}
