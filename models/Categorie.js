// models/categorie.js
module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categorie', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'categories',
    timestamps: true,
    underscored: true,  // Utilisation du format snake_case pour les colonnes
  });

  // Associations
  Categorie.associate = (models) => {
    // Une catégorie peut avoir plusieurs produits
    Categorie.hasMany(models.Produit, {
      foreignKey: 'categorie_id',
      onDelete: 'SET NULL',  // Lors de la suppression d'une catégorie, set null sur le produit
      onUpdate: 'CASCADE',   // Mise à jour des produits si l'ID de la catégorie change
    });
  };

  return Categorie;
};
