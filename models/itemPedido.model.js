const { Model, DataTypes } = require("sequelize");

class ItemPedido extends Model {
  static init(sequelize) {
    super.init(
      {
        quantidade: DataTypes.INTEGER,
        preco_unitario: DataTypes.DECIMAL(10, 2),
      },
      {
        sequelize,
        tableName: "itens_pedido",
        modelName: "ItemPedido",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Pedido, {
      foreignKey: "pedido_id",
      as: "pedido",
    });

    this.belongsTo(models.Produto, {
      foreignKey: "produto_id",
      as: "produto",
    });
  }
}

module.exports = ItemPedido;
