import {
  GET_ALL_DOGS,
  GET_DETAIL_DOGS,
  POST_DOG,
  TEMPERAMENTS_DOG,
  CLEANDETAIL_DOG,
  ORDENAMIENTO_PESO,
  ORDENAMIENTO_ABECEDARIO,
  FILTRADO_TEMPERAMENTO,
  FILTRADO_DOGS,
  GET_DOG_BY_NAME,
} from "./action-types";

const initialState = {
  AllDogs: [],
  AllDogsCopia: [],
  Temperaments: [],
  DogDetail: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        AllDogs: action.payload,
        AllDogsCopia: action.payload,
      };

    case GET_DETAIL_DOGS:
      return {
        ...state,
        DogDetail: action.payload,
      };

    case GET_DOG_BY_NAME:
      console.log(action.payload);
      return {
        ...state,
        AllDogs: [...action.payload],
      };

    case TEMPERAMENTS_DOG:
      return {
        ...state,
        Temperaments: action.payload,
      };

    case CLEANDETAIL_DOG:
      return {
        ...state,
        DogDetail: {},
      };

    case ORDENAMIENTO_PESO:
      return {
        ...state,
        AllDogs:
          action.payload === "lower weight"
            ? [...state.AllDogs].sort((a, b) => {
                if (
                  Number(a.weight.split("-").at(-1)) >
                  Number(b.weight.split("-").at(-1))
                )
                  return 1;
                else if (
                  Number(a.weight.split(" ").at(-1)) <
                  Number(b.weight.split(" ").at(-1))
                ) {
                  return -1;
                } else return 0;
              })
            : [...state.AllDogs].sort((a, b) => {
                if (
                  Number(a.weight.split(" ").at(-1)) >
                  Number(b.weight.split(" ").at(-1))
                )
                  return -1;
                else if (
                  Number(a.weight.split(" ").at(-1)) <
                  Number(b.weight.split(" ").at(-1))
                ) {
                  return 1;
                } else return 0;
              }),
      };

    case ORDENAMIENTO_ABECEDARIO:
      return {
        ...state,
        AllDogs: [...state.AllDogs].sort((a, b) => {
          if (a.name < b.name) {
            return action.payload === "z-a" ? 1 : -1;
          }
          if (a.name > b.name) {
            return action.payload === "z-a" ? -1 : 1;
          }
        }),
      };

    case FILTRADO_TEMPERAMENTO:
      return {
        ...state,
        AllDogs: [...state.AllDogsCopia].filter(
          (dog) =>
            dog.temperament !== undefined &&
            dog.temperament.includes(action.payload) === true
        ),
      };

    case FILTRADO_DOGS:
      return {
        ...state,
        AllDogs:
          action.payload === "AllDogs"
            ? [...state.AllDogsCopia].map((dog) => dog)
            : action.payload === "DogsApi"
            ? [...state.AllDogsCopia].filter(
                (dog) => typeof dog.id === "number"
              )
            : [...state.AllDogsCopia].filter(
                (dog) => typeof dog.id !== "number"
              ),
      };
    
      case POST_DOG:
        return{ ...state};

    default:
      return { ...state };
  }
};

export default rootReducer;
