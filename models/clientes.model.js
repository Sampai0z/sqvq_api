const { Model, DataTypes } = require('sequelize');

class UsuariosModel extends Model {
  static init(sequelize) {
    return super.init(
      {
        nome: { type: DataTypes.STRING, allowNull: false,},
        email: { type: DataTypes.STRING, unique: true, allowNull: false,},
        telefone: { type: DataTypes.STRING, allowNull: false, },
        endereco: { type: DataTypes.TEXT, allowNull: false,},
        password: { type: DataTypes.STRING, allowNull: false, },
        tipo: { type: DataTypes.ENUM('cliente', 'funcionario', 'admin'), defaultValue: 'cliente', allowNull: true},
      },
      {
        sequelize,
        modelName: 'Cliente',
        tableName: 'clientes',
        timestamps: false,
      }
    );
  }

  static associate(models) {
    // this.hasMany(models.Pedido, { foreignKey: 'cliente_id', as: 'pedidos' });
    // this.hasMany(models.AtualizacaoPedido, { foreignKey: 'feito_por', as: 'atualizacoes' });
  }
}

module.exports = UsuariosModel;
