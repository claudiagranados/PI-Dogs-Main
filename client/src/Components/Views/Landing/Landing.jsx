import { Link } from "react-router-dom"
import style from "./Landing.module.css"
import dogLandingImage from "../../../extras/dog-landing.png";

const Landing = () => {
  return (
    <div className={style.container}>
      <div className={style.background} style={{ backgroundImage: `url(${dogLandingImage})` }}></div>
      <div className={style.overlay}></div>
      <div className={style.content}>
        <h1 className={style.title}>Hola, esta es mi Dog Api</h1>
        <Link to="/home" className={style.link}>
          <button className={`${style.button} ${style.enterButton}`}>Entrar</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;