const express = require("express");
const router = express.Router();
const produitController = require("../controllers/ProduitController");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");

// Routes pour les produits
router.get("/", produitController.getAllProduits); // Voir tous les produits
router.get("/:id", produitController.getProduitById); // Voir un produit spécifique
router.post("/", authenticate, isAdmin, produitController.createProduit); // Ajouter un produit
router.put("/:id", authenticate, isAdmin, produitController.updateProduit); // Modifier un produit
router.delete("/:id", authenticate, isAdmin, produitController.deleteProduit); // Supprimer un produit

module.exports = router;
