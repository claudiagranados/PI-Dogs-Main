const { Dog, Temperament } = require("../db"); 
const { Op } = require("sequelize"); 
const axios = require("axios"); 


const infoAllDogs = async (name) => {
  let dogsFoundDB = []; 
  let dogsFoundAPI = []; 

  if (!name) {
    dogsFoundDB = await Dog.findAll({ include: Temperament });

    const apiResponse = await axios.get("https://api.thedogapi.com/v1/breeds");
    dogsFoundAPI = apiResponse.data.map((dog) => ({
      id: dog.id,
      name: dog.name,
      image: dog.image?.url || `https://cdn2.thedogapi.com/images/${dog?.reference_image_id}.jpg` || "",
      height: dog.height?.metric,
      weight: dog.weight?.metric,
      life_span: dog.life_span,
      temperament: dog.temperament,
    }));
  } else {
    const nameUnified = name.toLowerCase();
    dogsFoundDB = await Dog.findAll({
      where: {
        name: { [Op.iLike]: `%${nameUnified}%` },
      },
      include: Temperament,
    });

    const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${nameUnified}`);
    dogsFoundAPI = apiResponse.data
      .filter((dog) => dog.reference_image_id)
      .map(async (dog) => {
        const imageResponse = await axios.get(`https://api.thedogapi.com/v1/images/${dog.reference_image_id}`);
        const imageData = imageResponse.data;
        return {
          id: imageData?.breeds[0].id,
          name: imageData?.breeds[0].name,
          image: imageData?.url,
          height: imageData?.breeds[0].height.metric,
          weight: imageData?.breeds[0].weight.metric,
          life_span: imageData?.breeds[0].life_span,
          temperament: imageData?.breeds[0]?.temperament,
        };
      });
    dogsFoundAPI = await Promise.all(dogsFoundAPI);
  }

  const result = [...dogsFoundAPI, ...dogsFoundDB];

  

  return result;
};

module.exports = {
  infoAllDogs,
};
