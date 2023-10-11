import { useState } from "react";
import { useDispatch } from "react-redux";
import { GetDogByName } from "../../Redux/actions";
import styles from "./OnsearchDogs.module.css";

const OnSearchDog = () => {
  const [name, setName] = useState(""); 

  const dispatch = useDispatch();
  const onsearchClick = (name) => {
    if (!name.length) {
      alert("Ingresa el nombre del perrito");
    } else {
      dispatch(GetDogByName(name)); 
    }
  };

  const HandleChange = (event) => {
    setName(event.target.value); 
  };

  return (
    <div className={styles.div}>
      <input
        className={styles.input}
        type="search"
        name="name"
        placeholder="Escribe una raza de perrito"
        onChange={HandleChange}
      />
      <button onClick={() => onsearchClick(name)} className={styles.busqueda}>
        Buscar
      </button>

    </div>
  );
};

export default OnSearchDog;
