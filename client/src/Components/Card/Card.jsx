import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const CardDogs = ({ id, name, height, weight, life_span, image, temperament }) => {
	return (
		<Link className={styles.link} to={`/detail/${id}`}>
		<div className={styles.div}>
		  <h1> {name}</h1>
		  <img className={styles.img} src={image} />
		  <h3>Peso : {weight + "Kg"}</h3>
		  <h3 className={styles.temperament}>Temperamentos: {temperament}</h3>
		  
		</div>
	  </Link>
		
	);
};

export default CardDogs;
