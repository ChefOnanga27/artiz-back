const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./models'); // Connexion à Sequelize
const routes = require('./route'); // Import des routes
require('dotenv').config();

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api', routes);

// Synchronisation + lancement du serveur
const PORT = process.env.PORT || 5000;

// 👇 Change `force: true` à `false` si tu ne veux pas supprimer les tables
sequelize.sync({ force: false }) 
  .then(() => {
    console.log("✅ Les tables ont été recréées avec succès.");
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Erreur lors de la synchronisation de la base de données :", err);
    process.exit(1);
  });

// Test route
app.get('/', (req, res) => {
  res.send('Le serveur fonctionne !');
});
