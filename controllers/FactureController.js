const { models } = require("../models");
const sendEmail = require("../utils/mailer");

// Créer une facture pour une commande
const createFacture = async (req, res) => {
  try {
    const { commandeId, montant } = req.body;
    const commande = await models.Commande.findByPk(commandeId);

    if (!commande) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    const facture = await models.Facture.create({
      commandeId: commande.id,
      montant,
      statut: "non payé",
    });

    res.status(201).json({ message: "Facture créée", facture });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Voir la facture d'une commande
const getFacture = async (req, res) => {
  try {
    const facture = await models.Facture.findOne({
      where: { commandeId: req.params.commandeId },
    });

    if (!facture) {
      return res.status(404).json({ message: "Facture non trouvée" });
    }

    res.json({ facture });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Envoi d’email après une commande
const sendInvoiceEmail = async (req, res) => {
  const { email, factureId } = req.body;

  const subject = "Votre facture pour votre commande";
  const text = `Bonjour, voici votre facture pour la commande ${factureId}.`;
  const html = `<h1>Facture ${factureId}</h1><p>Merci d'avoir effectué un achat chez nous.</p><p><a href="http://artiz/facture/${factureId}">Voir la facture complète</a></p>`;

  try {
    await sendEmail(email, subject, text, html);
    res.status(200).json({ message: "Email envoyé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'envoi de l'email." });
  }
};

// ✅ Exportation correcte de toutes les fonctions
module.exports = {
  createFacture,
  getFacture,
  sendInvoiceEmail,
};
