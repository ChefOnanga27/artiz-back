const { models } = require("../models");

// Voir tous les produits
exports.getAllProduits = async (req, res) => {
  try {
    const produits = await models.Produit.findAll();
    res.status(200).json({ produits });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Voir un produit spécifique par ID
exports.getProduitById = async (req, res) => {
  try {
    const produit = await models.Produit.findByPk(req.params.id);
    if (!produit) return res.status(404).json({ message: "Produit non trouvé" });
    res.status(200).json({ produit });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Ajouter un produit
exports.createProduit = async (req, res) => {
  try {
    const { nom, description, prix, categorieId, imageUrl } = req.body;
    const produit = await models.Produit.create({ nom, description, prix, categorieId, imageUrl });
    res.status(201).json({ message: "Produit ajouté", produit });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Modifier un produit
exports.updateProduit = async (req, res) => {
  try {
    const produit = await models.Produit.findByPk(req.params.id);
    if (!produit) return res.status(404).json({ message: "Produit non trouvé" });

    await produit.update(req.body);
    res.json({ message: "Produit mis à jour", produit });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Supprimer un produit
exports.deleteProduit = async (req, res) => {
  try {
    const produit = await models.Produit.findByPk(req.params.id);
    if (!produit) return res.status(404).json({ message: "Produit non trouvé" });

    await produit.destroy();
    res.json({ message: "Produit supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
