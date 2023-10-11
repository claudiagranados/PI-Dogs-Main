const { getAllTemperaments } = require("../controllers/allTemperamentsControler");

const getTemperaments = async (req, res) => {
  try {
    const temperaments = await getAllTemperaments();
    return res.status(200).json(temperaments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTemperaments,
};

