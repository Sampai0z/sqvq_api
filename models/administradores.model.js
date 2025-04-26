const { Model, DataTypes } = require("sequelize");

class AdminModel extends Model {
  static init(sequelize) {
    return super.init(
      {
        nome: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        telefone: { type: DataTypes.STRING, allowNull: true },
        endereco: { type: DataTypes.TEXT, allowNull: true },
        cidade: { type: DataTypes.STRING, allowNull: true },
        cep: { type: DataTypes.STRING, allowNull: true },
        data_cadastro: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "admin",
        },
      },
      {
        sequelize,
        modelName: "Admin",
        tableName: "admin",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    // Associações futuras aqui, se quiser
  }
}

module.exports = AdminModel;
