const express = require("express");
const router = express.Router();
const utilisateurController = require("../controllers/utilisateur");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");

// Routes pour les utilisateurs (clients)
router.post("/register", utilisateurController.registerClient); // Inscription
router.post("/login", utilisateurController.login); // Connexion
router.put("/profile", authenticate, utilisateurController.updateProfile); // Modifier profil

// Routes pour les administrateurs
router.delete("/delete/:id", authenticate, isAdmin, utilisateurController.deleteUtilisateur); // Supprimer utilisateur
router.get("/users", authenticate, isAdmin, utilisateurController.getAllUsers); // Voir tous les utilisateurs

module.exports = router;
