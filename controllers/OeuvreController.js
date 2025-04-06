const { models } = require("../models");

// Voir toutes les œuvres
exports.getAllOeuvres = async (req, res) => {
  try {
    const oeuvres = await models.Oeuvre.findAll();
    res.status(200).json({ oeuvres });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Voir une œuvre par ID
exports.getOeuvreById = async (req, res) => {
  try {
    const oeuvre = await models.Oeuvre.findByPk(req.params.id);
    if (!oeuvre) return res.status(404).json({ message: "Œuvre non trouvée" });
    res.json(oeuvre);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Ajouter une œuvre
exports.createOeuvre = async (req, res) => {
  try {
    const { nom, histoire } = req.body;
    const oeuvre = await models.Oeuvre.create({ nom, histoire });
    res.status(201).json({ message: "Œuvre ajoutée", oeuvre });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Modifier une œuvre
exports.updateOeuvre = async (req, res) => {
  try {
    const oeuvre = await models.Oeuvre.findByPk(req.params.id);
    if (!oeuvre) return res.status(404).json({ message: "Œuvre non trouvée" });

    const { nom, histoire } = req.body;
    await oeuvre.update({ nom, histoire });
    res.json({ message: "Œuvre mise à jour", oeuvre });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Supprimer une œuvre
exports.deleteOeuvre = async (req, res) => {
  try {
    const oeuvre = await models.Oeuvre.findByPk(req.params.id);
    if (!oeuvre) return res.status(404).json({ message: "Œuvre non trouvée" });

    await oeuvre.destroy();
    res.json({ message: "Œuvre supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
