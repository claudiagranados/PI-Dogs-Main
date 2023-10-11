const { infoAllDogs } = require("../controllers/allDogsController");

const getAllDogs = async (req, res) => {
  try {
    const { name } = req.query;
    const responseDogs = await infoAllDogs(name);

    if (Array.isArray(responseDogs) && responseDogs.length === 0) {
      return res.status(404).json({ message: `No se encontraron perritos con el nombre ${name}` });
    }

    return res.status(200).json(responseDogs);
  } catch (error) {
    if (error.response && error.response.status) {
      // Maneja el error de la API de perros aquí
      return res.status(error.response.status).json(error.response.data);
    } else {
      // Maneja otros errores aquí
      return res.status(500).send("Error interno del servidor");
    }
  }
};

module.exports = {
  getAllDogs,
};
