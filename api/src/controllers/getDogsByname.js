const axios = require("axios");
const { Op } = require("sequelize");
require("dotenv").config();
const api_key = process.env.API_KEY;
const URL = "https://api.thedogapi.com/v1/breeds";
const { Dog, Temperament } = require("../db.js");

//obtener dogbyNAME de la API
const getDogsByname = async (req, res) => {
    try {
        const { name } = req.query;

        //Consulta api y almacenaje data en apiDogs
        const response = await axios(`${URL}?api_key=${api_key}`);
        let apiDogs = response.data;

        if (name) {
            apiDogsFiltered = apiDogs
                .filter((dog) =>
                    dog.name.toLowerCase().includes(name.toLowerCase())
                )
                .map((dog) => {
                    return {
                        id: dog.id,
                        name: dog.name,
                        height: dog.height.metric,
                        weight: dog.weight.metric,
                        life_span: dog.life_span,
                        image: dog.image.url,
                        temperament: dog.temperament,
                    };
                });
        }

        //Consulta a la DB y almacenaje data en dbDogs
        const dogDb = await Dog.findAll({
            where: { name: { [Op.iLike]: `%${name}%` } },
            include: [
                {
                    model: Temperament,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                },
            ],
        });

        // console.log(dogDb);

        //combino resultados de las busquedas
        const allDogs = [...apiDogsFiltered, ...dogDb];

        //si no hay resultados retorno not found
        if (allDogs.length === 0)
            return res.status(200).json({ message: "Not found" });

        //retorno resultados
        return res.status(200).json(allDogs);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = { getDogsByname };
