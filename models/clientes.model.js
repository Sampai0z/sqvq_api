const { Model, DataTypes } = require("sequelize");

class UsuariosModel extends Model {
  static init(sequelize) {
    return super.init(
      {
        nome: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        telefone: { type: DataTypes.STRING, allowNull: false },
        cidade: { type: DataTypes.STRING, allowNull: false },
        endereco: { type: DataTypes.TEXT, allowNull: false },
        numero: { type: DataTypes.STRING, allowNull: false },
        bairro: { type: DataTypes.TEXT, allowNull: false },
        complemento: { type: DataTypes.TEXT, allowNull: false },
        cep: { type: DataTypes.STRING, allowNull: false },
        estado: {
          type: DataTypes.STRING(2),
          allowNull: true, // ou false se for obrigatório
        },
        data_cadastro: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        // tipo: {
        //   type: DataTypes.ENUM("cliente", "funcionario", "admin"),
        //   defaultValue: "cliente",
        //   allowNull: true,
        // },
      },
      {
        sequelize,
        modelName: "Cliente",
        tableName: "clientes",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Pedido, {
      foreignKey: "cliente_id",
      as: "pedidos",
    });
  }
}

module.exports = UsuariosModel;
