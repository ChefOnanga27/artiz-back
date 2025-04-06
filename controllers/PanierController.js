const { models } = require("../models");

// Ajouter un produit au panier
exports.addProduitToPanier = async (req, res) => {
  try {
    const { produitId, quantite } = req.body;
    const panier = await models.Panier.findOne({ where: { utilisateurId: req.user.id } });

    if (!panier) {
      return res.status(404).json({ message: "Panier non trouvé" });
    }

    const produit = await models.Produit.findByPk(produitId);
    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    const prix = produit.prix * quantite;

    await models.DetailCommande.create({
      panierId: panier.id,
      produitId: produit.id,
      quantite,
      prix,
    });

    res.status(201).json({ message: "Produit ajouté au panier" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Voir les produits dans le panier
exports.getPanier = async (req, res) => {
  try {
    const panier = await models.Panier.findOne({
      where: { utilisateurId: req.user.id },
      include: [models.Produit],
    });

    if (!panier) {
      return res.status(404).json({ message: "Panier vide ou non trouvé" });
    }

    res.json({ panier });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Supprimer un produit du panier
exports.removeProduitFromPanier = async (req, res) => {
  try {
    const { produitId } = req.params;
    const panier = await models.Panier.findOne({
      where: { utilisateurId: req.user.id },
    });

    if (!panier) {
      return res.status(404).json({ message: "Panier non trouvé" });
    }

    const detailCommande = await models.DetailCommande.findOne({
      where: { panierId: panier.id, produitId },
    });

    if (!detailCommande) {
      return res.status(404).json({ message: "Produit non trouvé dans le panier" });
    }

    await detailCommande.destroy();
    res.json({ message: "Produit supprimé du panier" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
