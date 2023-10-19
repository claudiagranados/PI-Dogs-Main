const { Dog, Temperament } = require("../db.js");

const postDog = async (req, res) => {
 try {
  const { name, height, weight, life_span, image, temperament } = req.body;

  const createDog = await Dog.create({
   name,
   height,
   weight,
   life_span,
   image,
  });

  const temperamentDb = await Temperament.findAll({
    where: { name: temperament },
   });

  createDog.addTemperament(temperamentDb);

  return res.status(200).json(createDog);
 } catch (error) {
  return res.status(400).send(error.message);
 }
};

module.exports = { postDog };
