export const allDogs = () => {
  return async (dispatch) => {
   try{     
     const { data } = await axios(`${endpoint}/dogs/`);
     dispatch({
     type: ALLDOGS,
     payload: data,
   })
 } catch(error){
   console.error('Error al traer todos los perros', error);
 }
}}

export const getDogs = ()=> {
  return async (dispatch)=>{
      const apiData= (await axios.get(`${server}`)).data
      dispatch({type: GET_DOGS, payload: apiData})
  }
}
export const getAllDogs = () => {
  return async function (dispatch) {
      try {
          const response = await axios.get(`http://localhost:3001/dogs`);
          const dogs = response.data;
          dispatch({
          type: GET_ALL_DOGS,
          payload: dogs,
          });
      } catch (error) {
          console.log(error);
      }
  };
}