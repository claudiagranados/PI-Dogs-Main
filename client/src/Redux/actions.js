import axios from "axios";
import {
  GET_ALL_DOGS,
  GET_DETAIL_DOGS,
  GET_DOG_BY_NAME,
  TEMPERAMENTS_DOG,
  ORDENAMIENTO_ABECEDARIO,
  ORDENAMIENTO_PESO,
  FILTRADO_DOGS,
  FILTRADO_TEMPERAMENTO,
  CLEANDETAIL_DOG,
  POST_DOG
} from "./action-types";

export const TodosLosDogs = () => {
  // debo ejecutar esta funcion que me retorna la peticion y el resto de cosas..
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/dogs");
      dispatch({ type: GET_ALL_DOGS, payload: response.data });
    } catch (error) {
      alert(error.message);
    }
  };
}; // el response.data seria el array completo que nos trae la peticion..

export const DetailDogs = (id) => {
  return async (dispatch) => {
      try {
        const apiData= (await axios.get(`http://localhost:3001/dogs/${id}`)).data
        dispatch({
            type: GET_DETAIL_DOGS, 
            payload: apiData
        })    
        } catch (error) {
            alert(error.response.data.error)
    }
  };
};

export const GetDogByName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/dogs?name=${name}`
      );
      dispatch({ type: GET_DOG_BY_NAME, payload: response.data }); // response.data seria el nuevo array que obtenemos de la busqueda...
    } catch (error) {
      alert("Nombre de perrito no valido");
    }
  };
};

export const temperamentsDog = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/temperaments`);
      dispatch({ type: TEMPERAMENTS_DOG, payload: response.data }); // response.data seria el nuevo array que obtenemos de la busqueda...
    } catch (error) {
      alert(error.message);
    }
  }; // en response.data nos trae el temperamentos que es un array de temperamentos...
};

export const FiltradoPorPeso = (event) => {
  // en este caso seria el peso del animal = 10-15
  try {
    return {
      type: ORDENAMIENTO_PESO,
      payload: event,
    };
  } catch (error) {
    alert(error.message);
  }
};

export const FiltradoAbecedario = (event) => {
  // event en este caso seria A-Z o Z-A
  try {
    return {
      type: ORDENAMIENTO_ABECEDARIO,
      payload: event,
    };
  } catch (error) {
    alert(error.message);
  }
};

export const FiltradoPorTemperamento = (event) => {
  // en este caso seria por temperamento..
  try {
    return {
      type: FILTRADO_TEMPERAMENTO,
      payload: event,
    };
  } catch (error) {
    alert(error.message);
  }
};

export const FiltradoPorDogs = (event) => {
  // en este caso seria por temperamento..
  try {
    return {
      type: FILTRADO_DOGS,
      payload: event,
    };
  } catch (error) {
    alert(error.message);
  }
};


export const postDog = (data) => {
  return async function (dispatch) {
      try {
          const posted = await axios.post('http://localhost:3001/dogs', data)
          return dispatch({
              type: POST_DOG,
              payload: posted.data
          })
      } catch (error) {
          console.log(error);
      }
      
  }
};

export const cleanDetail = () => {
  return {
    type: CLEANDETAIL_DOG, // cuando se desmonte el componente hago dispatch a esta actions
  };
};
