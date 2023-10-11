const { Dog, Temperament } = require("../db");

const createDog = async ({
  name,
  image,
  height,
  weight,
  life_span,
  temperaments,
}) => {
  if (!name || !image || !height || !weight || !life_span || !temperaments)
    throw Error("You must complete all fields");

  // Crear un nuevo registro de perro en la base de datos
  const newDog = await Dog.create({
    name,
    image,
    height,
    weight,
    life_span,
  });

  const tempsFound = [];
  for (const temp of temperaments) {
    // Buscar cada temperamento en la base de datos
    const tempFound = await Temperament.findOne({ where: { name: temp } });
    if (!tempFound) {
      throw new Error(`Tipo de ${temp} no existe`);
    }
    tempsFound.push(tempFound);
  }

  // Añadir los temperamentos al perro mediante el método add de Sequelize
  await newDog.addTemperament(tempsFound);

  return newDog;
};

module.exports = {
  createDog,
};
