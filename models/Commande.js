// models/commande.js
module.exports = (sequelize, DataTypes) => {
  const Commande = sequelize.define("Commande", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "en attente",
    },
    total: {
      type: DataTypes.FLOAT,
    },
  }, {
    tableName: 'commandes',
    timestamps: true,
    underscored: true
  });

  Commande.associate = (models) => {
    Commande.belongsTo(models.Utilisateur, { foreignKey: "utilisateur_id" });
    Commande.belongsToMany(models.Produit, { through: "CommandeProduit" });
    Commande.hasOne(models.Paiement, { foreignKey: "commande_id" });
  };

  return Commande;
};