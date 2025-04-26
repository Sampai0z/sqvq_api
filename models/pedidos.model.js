const { Model, DataTypes } = require("sequelize");

class PedidoModel extends Model {
  static init(sequelize) {
    super.init(
      {
        cod_pedido: {
          type: DataTypes.STRING(5),
          allowNull: false,
          unique: true,
        },
        status: {
          type: DataTypes.ENUM("a_fazer", "em_producao", "entregue"),
          defaultValue: "a_fazer",
        },
        preco_total: DataTypes.DECIMAL(10, 2),
        data_pedido: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: "pedidos",
        modelName: "Pedido",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Cliente, {
      foreignKey: "cliente_id",
      as: "cliente",
    });
    this.hasMany(models.ItemPedido, {
      foreignKey: "pedido_id",
      as: "itens_pedido",
    });
  }
}

module.exports = PedidoModel;
