// models/panier.js
module.exports = (sequelize, DataTypes) => {
  const Panier = sequelize.define("Panier", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'paniers',
    timestamps: true,
    underscored: true,
  });

  Panier.associate = (models) => {
    Panier.belongsTo(models.Utilisateur, { foreignKey: "utilisateur_id" });
    Panier.belongsToMany(models.Produit, { through: models.DetailCommande });
  };

  return Panier;
};