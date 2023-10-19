const axios = require("axios");
require("dotenv").config();
const api_key = process.env.API_KEY;

//Modelo Temperament
const Temperament = require("../db.js").Temperament;

const URL = "https://api.thedogapi.com/v1/breeds";

const getDogsTemperaments = async (req, res) => {
    try {
        const apiResponse = await axios(`${URL}?api_key=${api_key}`);
        const apiData = apiResponse.data;
        //uso set para eliminar los repetidos mas rapido
        const temperaments = new Set(
            apiData
                .map(dog => dog.temperament) //obtengo los temperamentos de cada objeto
                .join(",") //uno todos los temperamentos en un solo string separados por ,
                .split(",") //convierto el string en un array 
                .filter((temperament) => temperament.trim().length > 0)
                .sort())

                //console.log("API:", temperaments)

                //añadir temperamentos a bd

            //ver si es necesario el el await promis all
        const newTemperamentPromise = Array.from(temperaments).map((temperament) =>
            Temperament.findOrCreate({ where: { name: temperament.trim() } })
        );

        //console.log(" BD:", newTemperamentPromise);

        const newTemperament = await Promise.all(newTemperamentPromise);

        // console.log("temperamentos BD:", newTemperament);

        //traigo temperamentos de bd
        const temperamentsDB = await Temperament.findAll();

        // console.log("Temperamentos de la BD:", temperamentsDB);

        return res.status(200).json(temperamentsDB);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getDogsTemperaments,
};
