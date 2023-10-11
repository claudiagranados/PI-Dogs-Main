const axios = require("axios");
const { Dog } = require("../db");

const infoDogById = async (id) => {
  // busca primero en la DB si el ID es más largo es UUID
  if (id.length > 3) {
    const dbResult = await Dog.findByPk(id);
    
    return dbResult;
  }

  //después de buscar en la DB busca en la API
  const { data } = await axios(`https://api.thedogapi.com/v1/breeds/${id}`);
 
  const dogById = {
    id,
    name: data.name,
    image: data.image?.url || `https://cdn2.thedogapi.com/images/${data.reference_image_id}.jpg` || "",
    height: data.height?.metric,
    weight: data.weight?.metric,
    life_span: data.life_span,
    temperament: data.temperament
  }
  return dogById;
};


module.exports = {
  infoDogById,
}