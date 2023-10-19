import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  FiltradoPorPeso,
  FiltradoAbecedario,
  temperamentsDog,
  FiltradoPorTemperamento,
  FiltradoPorDogs,
} from "../../Redux/actions";
import styles from "./Selects.module.css";

const Selects = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(temperamentsDog());
  }, []);

  const Temperaments = useSelector((state) => state.Temperaments); 

  const HandleChangeOrdenPeso = (event) => {
    if (event.target.value === "Select Weight") {
      return;
    } else {
      dispatch(FiltradoPorPeso(event.target.value)); 
    }
  };
  const HandleChangeOrdenAlfabetico = (event) => {
    if (event.target.value === "Alphabetical Order") {
      return;
    } else {
      dispatch(FiltradoAbecedario(event.target.value));
    }
  };

  const HandleChangeOrdenarTemperaments = (event) => {
    if (event.target.value === "Select a Temperament") {
      return;
    } else {
      dispatch(FiltradoPorTemperamento(event.target.value));
    }
  };

  const HandleChangeOrdenarLosDogs = (event) => {
    dispatch(FiltradoPorDogs(event.target.value));
  };

  return (
    <div className={styles.div}>
      <div className={styles.div1}>

        <select className={styles.select} onChange={HandleChangeOrdenarLosDogs} defaultvalue="AllDogs">
          <option value="AllDogs">Todos</option>
          <option value="DogsApi">PerritosApi</option>
          <option value="DogsCreate">PerritosCreados</option>
        </select>
        <select className={styles.select} onChange={HandleChangeOrdenPeso} defaultValue="Select Weight">
          <option value="Select Weight">Peso</option>
          <option value="Greater weight">Mayor peso</option>
          <option value="lower weight">Menor peso</option>
        </select>
        <select className={styles.select} onChange={HandleChangeOrdenAlfabetico} defaultValue="Alphabetical Order">
          <option value="Alphabetical Order">Orden Alfabético</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
        <select className={styles.select} onChange={HandleChangeOrdenarTemperaments} defaultValue="Selected a Temperament">
          <option value="Select a Temperament">Temperamentos</option>
          {Temperaments?.map((temp) => {
            return (
              <option key={temp.name} value={temp.name}>
                {temp.name}
              </option>
            );
          })}
        </select>
        
      </div>
    </div>
  );
};

export default Selects;
