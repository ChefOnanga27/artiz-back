const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Étape 1 : Initialisation vide
const models = {};

// Étape 2 : Enregistrement de chaque modèle sans association
models.Utilisateur = require("./Utilisateur")(sequelize, DataTypes);
models.Categorie = require("./Categorie")(sequelize, DataTypes);
models.Produit = require("./Produit")(sequelize, DataTypes);
models.Commande = require("./Commande")(sequelize, DataTypes);
models.Panier = require("./Panier")(sequelize, DataTypes);
models.DetailCommande = require("./DetailCommande")(sequelize, DataTypes);
models.Facture = require("./Facture")(sequelize, DataTypes);
models.Paiement = require("./paiement")(sequelize, DataTypes);
models.Musee = require("./Musee")(sequelize, DataTypes);
models.MessageWhatsApp = require("./MessageWhatsapp")(sequelize, DataTypes);

// Étape 3 : Appliquer les associations maintenant que TOUS les modèles existent
Object.values(models).forEach((model) => {
  if (model.associate) model.associate(models);
});

module.exports = { sequelize, models };
