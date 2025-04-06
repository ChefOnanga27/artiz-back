// models/detailCommande.js
module.exports = (sequelize, DataTypes) => {
  const DetailCommande = sequelize.define("DetailCommande", {
    quantite: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    prix: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'detail_commandes',
    timestamps: true,
    underscored: true,
  });

  DetailCommande.associate = (models) => {
    DetailCommande.belongsTo(models.Panier, { foreignKey: 'panier_id' });
    DetailCommande.belongsTo(models.Produit, { foreignKey: 'produit_id' });
  };

  return DetailCommande;
};