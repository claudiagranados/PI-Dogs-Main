const axios = require('axios');
const { Temperament } = require('../db')

const getAllTemperaments = async () => {
    const tempsData = await axios(`https://api.thedogapi.com/v1/breeds`)
    tempsData.data.forEach(dog => {
        if (dog.temperament) {
            let temps = dog.temperament.split(', ') 
            temps.forEach(dogTemp => {              
                Temperament.findOrCreate({          
                    where: { name: dogTemp } 
                })                           
            })
        }
    })
    const tempsFound = await Temperament.findAll()
    return tempsFound 
}

module.exports = {
    getAllTemperaments
}