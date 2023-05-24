const express = require("express");
const TestesController = require("../controllers/testes.controller");
// const AuthController = require("../controllers/authController");
const FornecedoresController = require("../controllers/fornecedores.controller");
const UsuariosController = require("../controllers/usuarios.controller");
const router = express.Router();

router.get("/usuarios/teste", UsuariosController.testeUm);

//

router.get("/fornecedores/listagem/teste", FornecedoresController.testeUm);
router.get("/fornecedores/listagem", FornecedoresController.listagem);
router.post(
	"/fornecedores/cadastro",
	FornecedoresController.cadastroFornecedor
);

module.exports = router;
