const { models } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @desc Inscription d'un client
 * @route POST /api/utilisateurs/register
 */
exports.registerClient = async (req, res) => {
  try {
    const { nom, email, password } = req.body;

    // Vérifie si l'email existe déjà
    const existingUser = await models.Utilisateur.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // Hash du mot de passe et création de l'utilisateur
    const hashedPassword = await bcrypt.hash(password, 10);
    const utilisateur = await models.Utilisateur.create({
      nom,
      email,
      password: hashedPassword,
      role: "client", // Rôle par défaut
    });

    res.status(201).json({ message: "Inscription réussie", utilisateur });
  } catch (error) {
    console.error("Erreur d'inscription:", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * @desc Connexion utilisateur
 * @route POST /api/utilisateurs/login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérification de l'utilisateur
    const utilisateur = await models.Utilisateur.findOne({ where: { email } });
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, utilisateur.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { id: utilisateur.id, role: utilisateur.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ message: "Connexion réussie", token });
  } catch (error) {
    console.error("Erreur de connexion:", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * @desc Modifier le profil utilisateur
 * @route PUT /api/utilisateurs/profile
 * @access Authentifié
 */
exports.updateProfile = async (req, res) => {
  try {
    const utilisateur = await models.Utilisateur.findByPk(req.user.id);
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await utilisateur.update(req.body);
    res.json({ message: "Profil mis à jour", utilisateur });
  } catch (error) {
    console.error("Erreur de mise à jour du profil:", error);
    res.status(400).json({ message: "Erreur de mise à jour", error });
  }
};

/**
 * @desc Supprimer un utilisateur (Admin uniquement)
 * @route DELETE /api/utilisateurs/delete/:id
 * @access Admin
 */
exports.deleteUtilisateur = async (req, res) => {
  try {
    // Vérification des droits d'accès
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Accès interdit" });
    }

    const utilisateur = await models.Utilisateur.findByPk(req.params.id);
    if (!utilisateur) return res.status(404).json({ message: "Utilisateur non trouvé" });

    // Suppression des commandes associées avant de supprimer l'utilisateur
    await models.Commande.destroy({ where: { utilisateurId: utilisateur.id } });
    await utilisateur.destroy();

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * @desc Récupérer tous les utilisateurs (Admin uniquement)
 * @route GET /api/utilisateurs/users
 * @access Admin
 */
exports.getAllUsers = async (req, res) => {
  try {
    const utilisateurs = await models.Utilisateur.findAll();
    res.json(utilisateurs);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
