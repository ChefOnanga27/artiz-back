// models/paiement.js
module.exports = (sequelize, DataTypes) => {
  const Paiement = sequelize.define("Paiement", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    montant: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    mode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statut: {
      type: DataTypes.STRING,
      defaultValue: "en attente",
    },
  }, {
    tableName: 'paiements',
    timestamps: true,
    underscored: true,
  });

  Paiement.associate = (models) => {
    Paiement.belongsTo(models.Commande, { foreignKey: "commande_id" });
  };

  return Paiement;
};