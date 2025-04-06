
// models/facture.js
module.exports = (sequelize, DataTypes) => {
  const Facture = sequelize.define("Facture", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    montant: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'factures',
    timestamps: true,
    underscored: true,
  });

  Facture.associate = (models) => {
    Facture.belongsTo(models.Commande, {
      foreignKey: "commande_id",
      as: "commande",
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    });
    Facture.belongsTo(models.Utilisateur, {
      foreignKey: "utilisateur_id",
      as: "utilisateur",
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    });
  };

  return Facture;
};
