const jwt = require("jsonwebtoken");
const { models } = require("../models");

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide" });
  }
};

// Vérification des rôles pour l'administrateur
const isAdmin = async (req, res, next) => {
  const user = await models.Utilisateur.findByPk(req.user.id);
  
  if (user.role !== "admin") {
    return res.status(403).json({ message: "Accès interdit. Administrateur requis." });
  }
  
  next();
};

module.exports = { authenticate, isAdmin };
