const { Model, DataTypes } = require("sequelize");

class FornecedoresModel extends Model {
	static init(sequelize) {
		super.init(
			{
				nome: { type: DataTypes.STRING, allowNull: true },
				empresa: { type: DataTypes.STRING, allowNull: true },
				telefone: { type: DataTypes.STRING, allowNull: true },
				dia_pedido: { type: DataTypes.STRING, allowNull: true },
				hora_limite_pedido: { type: DataTypes.STRING, allowNull: true },
				prazo_entrega: { type: DataTypes.STRING, allowNull: true },
				pedido_min: { type: DataTypes.FLOAT, allowNull: true },
				pagamento: { type: DataTypes.STRING, allowNull: true },
				categoria: { type: DataTypes.STRING, allowNull: true },
			},
			{
				sequelize,
				tableName: "fornecedores",
				timestamps: false,
			}
		);
	}

	static associate(models) {}
}

module.exports = FornecedoresModel;
