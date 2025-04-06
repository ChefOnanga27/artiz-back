// models/utilisateur.js
module.exports = (sequelize, DataTypes) => {
  const Utilisateur = sequelize.define("Utilisateur", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "client",
    },
  }, {
    tableName: 'utilisateurs',
    timestamps: true,
    underscored: true,
  });

  Utilisateur.associate = (models) => {
    Utilisateur.hasMany(models.Commande, { foreignKey: "utilisateur_id" });
    Utilisateur.hasMany(models.Panier, { foreignKey: "utilisateur_id" });
    Utilisateur.hasMany(models.MessageWhatsApp, { foreignKey: "utilisateur_id" });
    Utilisateur.hasMany(models.Facture, { foreignKey: "utilisateur_id" });
  };

  return Utilisateur;
};
