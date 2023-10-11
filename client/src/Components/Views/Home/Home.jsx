//? ACA VAMOS A RECIBIR EL ARRAY DE PERROS Y LE VAMOS A ENVIAR POR PROPS A LAS CARDDOGS. LAS PROPIEDADES DE CADA CACHORRO..
import styles from "./Home.module.css";
import CardDogs from "../../Card/Card";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { TodosLosDogs } from "../../../Redux/actions";
import Paginado from "../../Paginado/Paginado";

const HomePage = () => {
  const dispatch = useDispatch();
  const [Pagina, setPagina] = useState(1);
  const [DogPorPagina] = useState(8);
  const AllDogs = useSelector((state) => state.AllDogs);

  useEffect(() => {
    if (!AllDogs.length) dispatch(TodosLosDogs());
  }, []);

  const maximoDePagina = Math.ceil(AllDogs.length / DogPorPagina);

  // Verificar si AllDogs está vacío antes de mapear
  if (!AllDogs.length) {
    
  }

  return (
    <div className={styles.div}>
      {AllDogs?.slice(
        (Pagina - 1) * DogPorPagina,
        (Pagina - 1) * DogPorPagina + DogPorPagina
      ).map((dogs) => (
        <CardDogs
          created={dogs.created}
          key={dogs.id}
          id={dogs.id}
          image={dogs.image}
          name={dogs.name}
          weight={dogs.weight}
          temperament={dogs.temperament}
        />
      ))}
      <div className={styles.PaginadoPadre}>
        <div className={styles.Paginado}>
          <Paginado
            setPagina={setPagina}
            Pagina={Pagina}
            maximoDePagina={maximoDePagina}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
