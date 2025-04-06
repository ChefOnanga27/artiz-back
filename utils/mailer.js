const nodemailer = require("nodemailer");

// Créez un transporteur pour l'envoi des emails
const transporter = nodemailer.createTransport({
  service: "gmail", // Vous pouvez remplacer "gmail" par un autre service comme "outlook" ou "yahoo"
  auth: {
    user: process.env.EMAIL_USER, // Votre adresse email (assurez-vous de la définir dans un fichier .env)
    pass: process.env.EMAIL_PASS, // Le mot de passe de votre adresse email (également dans .env)
  },
});

// Fonction pour envoyer un e-mail
const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Adresse de l'expéditeur
    to, // Adresse du destinataire
    subject, // Sujet de l'email
    text, // Corps du message en texte brut
    html, // Corps du message en HTML
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé: " + info.response);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email: " + error);
  }
};

module.exports = sendEmail;
