const { Model, DataTypes } = require("sequelize");

class UsuariosModel extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: { type: DataTypes.STRING, allowNull: true },
        sobrenome: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        password: { type: DataTypes.STRING, allowNull: true },
      },
      {
        sequelize,
        tableName: "clientes",
        timestamps: false,
      }
    );
  }

  static associate(models) {}
}

module.exports = UsuariosModel;
