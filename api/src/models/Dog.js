const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Imagen: {
      type: DataTypes.STRING,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Altura: {
      type: DataTypes.DECIMAL,
    },
    Peso: {
      type: DataTypes.DECIMAL,
    },
    Años_de_vida: {
      type: DataTypes.INTEGER,
    },
  });
};
