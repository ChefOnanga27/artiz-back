const express = require("express");
const router = express.Router();
const commandeController = require("../controllers/CommandeController");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");

// Lister les commandes de l'utilisateur connecté
router.get("/", authenticate, commandeController.getCommandes);

// Passer une nouvelle commande
router.post("/", authenticate, commandeController.createCommande);

// Modifier le statut d'une commande (admin seulement)
router.put("/:id", authenticate, isAdmin, commandeController.updateStatutCommande);

module.exports = router;
