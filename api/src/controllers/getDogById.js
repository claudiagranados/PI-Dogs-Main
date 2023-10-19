const axios = require("axios");
require("dotenv").config();
const api_key = process.env.API_KEY;
const URL = "https://api.thedogapi.com/v1/breeds";
const { Dog, Temperament } = require("../db.js");

const regex = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;

//Obtener dogs de API
const getDogById = async (req, res) => {
    try {
        const { id } = req.params;
        if (regex.test(id)) {
            const dogDb = await Dog.findOne({
                where: { id: id },
                //Incluyo relacion con tabla Temperaments pero solo traigo el name de ese Temperament
                include: {
                    model: Temperament,
                    attributes: ["name"],
                    through: { attributes: [] }, //No muestro la tabla intermedia
                },
            });

            // console.log(dogDb.Temperaments)
            //Si no existe el registro en la DB retorno un mensaje "Not found"
            if (!dogDb) return res.status(200).json({ message: "Not found" });

            //Si existe el registro en la DB retorno el objeto con los datos de la DB
            return res.status(200).json(dogDb);
        } else {
            const apiResponse = await axios(`${URL}/${id}?api_key=${api_key}`);
            const { name } = apiResponse.data;

            //Si name existe en la respuesta de la API quiere decir que el id esta ahi, entonces creo objeto con los datos de la API
            if (name) {
                const {
                    id,
                    name,
                    height,
                    weight,
                    life_span,
                    reference_image_id,
                    temperament,
                } = apiResponse.data;

                const dog = {
                    id,
                    name,
                    height: height.metric,
                    weight: weight.metric,
                    life_span,
                    image: `https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`,
                    temperament,
                };
                //Retorno el objeto creado
                return res.status(200).json(dog);
            }
        }

        //Si no ingresa en el if anterior quiere decir que el id no esta en la API, entonces lo busco en la DB
        //Busco en la tabla dog el registro en el que la columna id sea igual al id que recibo por params
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { getDogById };
