const { createDog } = require("../controllers/postDogController");

const postDog = async (req, res) => {
  try {
    const { name, image, height, weight, life_span, temperaments } = req.body;
    const newDog = await createDog({
      name,
      image,
      height,
      weight,
      life_span,
      temperaments,
    });
    return res.status(200).json(newDog);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postDog,
};
