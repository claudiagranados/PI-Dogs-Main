import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import OnsearchDog from "../OnsearchDogs/OnsearchDogs";
import Selects from "./Selects";

const Nav = () => {
  return (
    <div className={styles.div}>
      
      <div className={styles.div1}>

        <Link className={styles.link} to={"/Home"}>
          Home
        </Link> 
        <Link className={styles.link} to={"/"}>
          Landing
        </Link>
        <Link className={styles.link} to={"/Form"}>
          Crear perrito 
        </Link>
        <OnsearchDog />
      </div>
      <Selects />
      
    </div>
  );
};

export default Nav;
