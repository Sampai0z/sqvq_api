const { Model, DataTypes } = require("sequelize");

class EncomendasModel extends Model {
	static init(sequelize) {
		super.init(
			{
				cliente_id: { type: DataTypes.INTEGER, allowNull: true },
				descricao: { type: DataTypes.STRING, allowNull: true },
				status: { type: DataTypes.STRING, allowNull: true },
				data_entrega: { type: DataTypes.DATE, allowNull: true },
				criado_em: { type: DataTypes.DATE, allowNull: true },
			},
			{
				sequelize,
				tableName: "encomendas",
				timestamps: false,
			}
		);
	}

	static associate(models) {}
}

module.exports = EncomendasModel;
