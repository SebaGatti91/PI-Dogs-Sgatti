const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
   },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   heigth: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weigth: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  life_span: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  });
};
