const express = require("express");
const TestesController = require("../controllers/testes.controller");
// const AdministradoresController = require("../controllers/administradores.controller");
const ClientesController = require("../controllers/clientes.controller");
const EncomendasController = require("../controllers/encomendas.controller");
const router = express.Router();

// COLOCAR OS METHODOS (CRUD) APÓS O ROUTER E DEPOIS DO NOME ". + FUNÇÃO QUE DESEJA"

//GET
router.get("/testes/padrao", TestesController.testeUm);
router.get("/clientes/login", ClientesController.login);

router.get("/clientes/lista", ClientesController.listarClientes);
router.get("/encomendas/lista", EncomendasController.listarEncomendas);

// //POST
router.post("/clientes/cadastro", ClientesController.cadastro);
router.post("/encomendas/cadastro", EncomendasController.cadastroEncomendas);

// //DELETE
// router.delete("/testes/padrao-dois", TestesController.testeDois);
// //UPDATE
// router.update("/testes/padrao-quatro", TestesController.testeQuatro);

//EM CIMA EU TAMBÉM ESCREVO COMO EU QUERO QUE SEJA A ROTA QUE SERÁ ESCRITA.

module.exports = router;
