const express = require("express");
const router = express.Router();
const oeuvreController = require("../controllers/OeuvreController");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");

// Routes pour les œuvres
router.get("/", oeuvreController.getAllOeuvres); // Afficher toutes les œuvres
router.get("/:id", oeuvreController.getOeuvreById); // Afficher une œuvre spécifique
router.post("/", authenticate, isAdmin, oeuvreController.createOeuvre); // Ajouter une œuvre
router.put("/:id", authenticate, isAdmin, oeuvreController.updateOeuvre); // Modifier une œuvre
router.delete("/:id", authenticate, isAdmin, oeuvreController.deleteOeuvre); // Supprimer une œuvre

module.exports = router;
