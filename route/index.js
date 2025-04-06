const express = require("express");
const router = express.Router();

const utilisateurRoutes = require("./utilisateurRoutes");
const produitRoutes = require("./produitRoutes");
const panierRoutes = require("./panierRoutes");
const commandeRoutes = require("./commandeRoutes");
const factureRoutes = require("./factureRoutes");
const oeuvreRoutes = require("./OeuvreRoutes"); // Importer les routes des œuvres

// Utilisateur Routes
router.use("/utilisateurs", utilisateurRoutes);

// Produit Routes
router.use("/produits", produitRoutes);

// Panier Routes
router.use("/panier", panierRoutes);

// Commande Routes
router.use("/commandes", commandeRoutes);

// Facture Routes
router.use("/factures", factureRoutes);

// Œuvre Routes
router.use("/oeuvres", oeuvreRoutes); // Ajouter les routes des œuvres

module.exports = router;
