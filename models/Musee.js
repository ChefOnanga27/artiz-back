// models/oeuvre.js
module.exports = (sequelize, DataTypes) => {
  const Oeuvre = sequelize.define("Oeuvre", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    histoire: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'oeuvres',
    timestamps: true,
    underscored: true,
  });

  return Oeuvre;
};