const axios = require("axios");
require("dotenv").config();
const api_key = process.env.API_KEY;
const Dog = require("../db.js").Dog;
const Temperament = require("../db.js").Temperament;

const URL = "https://api.thedogapi.com/v1/breeds";

const getDogs = async (req, res) => {
    try {
        //datos de api
        const response = await axios(`${URL}?api_key=${api_key}`);
        const dataResponse = response.data;
        const dogApiData = dataResponse.map((dog) => {
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

        //datos de bd
        const getDogsDb = await Dog.findAll({
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

        const allDogs = [...dogApiData, ...getDogsDb];
        // console.log(allDogs)

        return res.status(200).json(allDogs);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getDogs,
};
