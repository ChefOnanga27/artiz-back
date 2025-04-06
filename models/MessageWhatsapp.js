// models/messageWhatsApp.js
module.exports = (sequelize, DataTypes) => {
  const MessageWhatsApp = sequelize.define("MessageWhatsApp", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contenu: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'message_whatsapps',
    timestamps: true,
    underscored: true,
  });

  MessageWhatsApp.associate = (models) => {
    MessageWhatsApp.belongsTo(models.Utilisateur, { foreignKey: "utilisateur_id", as: "utilisateur" });
  };

  return MessageWhatsApp;
};