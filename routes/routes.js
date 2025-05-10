const express = require("express");
const AdministradoresController = require("../controllers/administradores.controller");
const ClientesController = require("../controllers/clientes.controller");
const PedidosController = require("../controllers/pedido.controller");
const router = express.Router();
const token = require("../middleware/auth");

// COLOCAR OS METHODOS (CRUD) APÓS O ROUTER E DEPOIS DO NOME ". + FUNÇÃO QUE DESEJA"

//GET
//clientes
router.get("/clientes/login", ClientesController.login);

router.get("/usuario", ClientesController.usuario);

router.get(
  "/clientes/lista",
  token.autenticarToken,
  ClientesController.listarClientes
);

router.post("/clientes/cadastro", ClientesController.cadastro);

//PEDIDOS
router.post("/pedidos", PedidosController.criarPedido);
router.get("/lista_pedidos", PedidosController.listaPedido);
router.get("/lista_pedidos_user", PedidosController.listaPedidoUser);

//ADM
router.get("/adm/login", AdministradoresController.login);
router.get("/administrador", AdministradoresController.administradorLogado);
router.post("/adm/cadastro", AdministradoresController.cadastrarAdmin);

// //DELETE
// router.delete("/testes/padrao-dois", TestesController.testeDois);
// //UPDATE
router.put("/cliente/endereco", ClientesController.alterEndereco);

//EM CIMA EU TAMBÉM ESCREVO COMO EU QUERO QUE SEJA A ROTA QUE SERÁ ESCRITA.

module.exports = router;
