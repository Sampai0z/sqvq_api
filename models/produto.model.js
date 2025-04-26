const { Model, DataTypes } = require("sequelize");

class Produto extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        preco: DataTypes.DECIMAL(10, 2),
      },
      {
        sequelize,
        tableName: "produtos",
        modelName: "Produto",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.ItemPedido, {
      foreignKey: "produto_id",
      as: "itens",
    });
  }
}

module.exports = Produto;
