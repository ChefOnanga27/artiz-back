const { models } = require("../models");

// Passer une commande
exports.createCommande = async (req, res) => {
  try {
    const { produits } = req.body;
    const utilisateurId = req.user.id;

    const commande = await models.Commande.create({ utilisateurId, total: 0 });
    await commande.addProduits(produits);

    const total = produits.reduce((sum, produit) => sum + produit.prix, 0);
    await commande.update({ total });

    res.status(201).json({ message: "Commande passée avec succès", commande });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Lister les commandes
exports.getCommandes = async (req, res) => {
  try {
    const commandes = await models.Commande.findAll({ where: { utilisateurId: req.user.id } });
    res.json({ commandes });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Modifier le statut d'une commande
exports.updateStatutCommande = async (req, res) => {
  try {
    const commande = await models.Commande.findByPk(req.params.id);
    if (!commande) return res.status(404).json({ message: "Commande non trouvée" });

    await commande.update({ status: req.body.status });
    res.json({ message: "Statut de la commande mis à jour", commande });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
