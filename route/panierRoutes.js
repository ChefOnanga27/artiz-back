const express = require("express");
const router = express.Router();
const panierController = require("../controllers/PanierController");
const { authenticate } = require("../middleware/authMiddleware");

// Routes pour le panier
router.get("/", authenticate, panierController.getPanier); // Voir le panier
router.post("/add", authenticate, panierController.addProduitToPanier); // Ajouter un produit au panier
router.delete("/remove/:produitId", authenticate, panierController.removeProduitFromPanier); // Supprimer un produit du panier

module.exports = router;
