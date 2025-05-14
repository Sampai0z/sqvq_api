const PedidoModel = require("../models/pedidos.model"); // Ajuste conforme seu path
const ItemPedidoModel = require("../models/itemPedido.model"); // Ajuste conforme seu path
const ProdutoModel = require("../models/produto.model"); // Ajuste conforme seu path
const jwt = require("jsonwebtoken");
const ClientesModel = require("../models/clientes.model");

// Função para gerar código único
const gerarCodigoPedidoUnico = async () => {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  function gerarCodigo() {
    let codigo = "";
    for (let i = 0; i < 5; i++) {
      codigo += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }
    return codigo;
  }

  let codigo;
  let existe = true;

  do {
    codigo = gerarCodigo();
    const pedidoExistente = await PedidoModel.findOne({
      where: { cod_pedido: codigo },
    });
    existe = !!pedidoExistente; // true se existir
  } while (existe);

  return codigo;
};

// Controller para criar pedido
const criarPedido = async (req, res) => {
  try {
    const { cliente_id, produtos } = req.body;

    if (!cliente_id || !Array.isArray(produtos) || produtos.length === 0) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    // Calcular preço total
    let preco_total = 5;
    const itensPedido = [];

    for (const item of produtos) {
      const produto = await ProdutoModel.findByPk(item.produto_id);
      if (!produto) {
        return res
          .status(400)
          .json({ error: `Produto com ID ${item.produto_id} não encontrado.` });
      }

      const preco_unitario = produto.preco;
      const subtotal = preco_unitario * item.quantidade;

      preco_total += subtotal;

      itensPedido.push({
        produto_id: item.produto_id,
        quantidade: item.quantidade,
        preco_unitario: preco_unitario,
      });
    }

    // Gerar código único para o pedido
    const codigoGerado = await gerarCodigoPedidoUnico();

    // Criar o pedido
    const novoPedido = await PedidoModel.create({
      cliente_id,
      cod_pedido: codigoGerado,
      preco_total,
      status: "a_fazer", // Opcional: já vem por padrão no Model
    });

    // Criar os itens do pedido
    for (const item of itensPedido) {
      await ItemPedidoModel.create({
        pedido_id: novoPedido.id,
        ...item,
      });
    }

    return res.status(201).json({
      message: "Pedido criado com sucesso!",
      pedido: novoPedido,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar pedido" });
  }
};

const listaPedido = async (req, res) => {
  try {
    const pedidos = await PedidoModel.findAll({
      include: [
        {
          model: ClientesModel,
          as: "cliente", // nome do alias usado no relacionamento
          attributes: [
            "nome",
            "endereco",
            "telefone",
            "email",
            "bairro",
            "complemento",
            "numero",
            "cep",
            "cidade",
          ], // coloque os campos que você quiser retornar
        },
        {
          model: ItemPedidoModel,
          as: "itens_pedido",
          include: [
            {
              model: ProdutoModel,
              as: "produto",
            },
          ],
        },
      ],
    });
    return res.status(200).send({
      status: 200,
      message: "Pedidos encontrados com sucesso!",
      data: pedidos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: 500,
      message: "Erro ao buscar pedidos",
      data: null,
      error: error,
    });
  }
};

//listando pro user
const listaPedidoUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const userId = decoded.id; // AQUI estava errado

    // Busca os pedidos deste usuário e inclui os itens associados
    const pedidos = await PedidoModel.findAll({
      where: { cliente_id: userId },
      include: [
        {
          model: ItemPedidoModel,
          as: "itens_pedido", // Alias correto
          include: [
            {
              model: ProdutoModel,
              as: "produto", // Alias de produto
            },
          ],
        },
      ],
    });

    return res.status(200).send({
      status: 200,
      message: "Pedidos encontrados com sucesso!",
      data: pedidos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: 500,
      message: "Erro ao buscar pedidos",
      data: null,
      error: error.message, // Exibe a mensagem do erro
      stack: error.stack, // Exibe o stack trace para mais detalhes
    });
  }
};

module.exports = { criarPedido, listaPedido, listaPedidoUser };
