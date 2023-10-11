import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const CardDogs = (props) => {
  const { id, image, name, temperament, weight } = props;
  return (
    <Link className={styles.link} to={`/detail/${id}`}>
      <div className={styles.div}>
        <h1> {name}</h1>
        <img className={styles.img} src={image} alt={props.name} />
        <h3>Peso : {weight + "Kg"}</h3>
        <h3 className={styles.temperament}>Temperamentos: {temperament}</h3>
        
      </div>
    </Link>
  )

};

export default CardDogs;

