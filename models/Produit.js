// models/produit.js
module.exports = (sequelize, DataTypes) => {
  const Produit = sequelize.define('Produit', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    prix: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    categorie_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories', // Table référencée
        key: 'id',           // Clé primaire de la table 'categories'
      },
      onDelete: 'SET NULL',   // Si la catégorie est supprimée, on met 'categorie_id' à NULL
      onUpdate: 'CASCADE',    // Si l'ID de la catégorie est mis à jour, on met à jour le produit
    },
  }, {
    tableName: 'produits',
    timestamps: true,
    underscored: true,  // Utilisation du format snake_case pour les colonnes
  });

  // Associations
  Produit.associate = (models) => {
    // Un produit appartient à une catégorie
    Produit.belongsTo(models.Categorie, {
      foreignKey: 'categorie_id',
    });

    // Un produit peut être dans plusieurs commandes (relation plusieurs à plusieurs)
    Produit.belongsToMany(models.Commande, { through: 'CommandeProduit' });

    // Un produit peut être dans plusieurs paniers (relation plusieurs à plusieurs)
    Produit.belongsToMany(models.Panier, { through: models.DetailCommande });
  };

  return Produit;
};
