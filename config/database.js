const { Sequelize } = require("sequelize"); // Importation de Sequelize
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
};

// Création de l'instance Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nom de la base de données
  process.env.DB_USER, // Nom d'utilisateur
  process.env.DB_PASSWORD, // Mot de passe
  {
    host: process.env.DB_HOST, // Hôte de la base de données
    dialect: "mysql", // Type de base de données
    logging: false, // Désactive les logs SQL
  }
);

// Vérification de la connexion à la base de données
sequelize
  .authenticate()
  .then(() => console.log("Connexion à la base de données réussie."))
  .catch((error) => console.error("Erreur de connexion:", error));

module.exports = sequelize; // Exportation de l'instance Sequelize
