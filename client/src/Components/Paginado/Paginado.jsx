import styles from "./Paginado.module.css"

const Paginado = ({ Pagina, setPagina, maximoDePagina }) => {
  const funcionSiguiente = () => {
    setPagina(Pagina + 1);
  };

  const funcionAnterior = () => {
    setPagina(Pagina - 1);
  };

  return (
    <div className={styles.div}>
      <button
        disabled={Pagina === 1 || Pagina < 1} 
        className={styles.BotonAnterior}
        onClick={funcionAnterior}
      >
        Anterior
      </button>
      <button
        disabled={Pagina === maximoDePagina} 
        className={styles.Boton}
        onClick={funcionSiguiente}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Paginado;