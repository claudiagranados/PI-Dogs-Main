import style from "./Detail.module.css";
import { useSelector, useDispatch } from "react-redux";
import { DetailDogs, cleanDetail } from "../../../Redux/actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const DogDetail = useSelector(state => state.DogDetail)
    const temperament = DogDetail.Temperaments;
    const tempReady = temperament && temperament[0]?.name; 

    useEffect(() => {
        dispatch(DetailDogs(id))
        return () => dispatch(cleanDetail())
    }, [dispatch, id])

    
    const lifeSpanWithoutYears = DogDetail.life_span?.replace(" years", "");

    return (
        <div className={style.container}>
            <div className={style.imgContainer}>
                <img src={DogDetail.image} alt={DogDetail.name} className={style.imagen} />
            </div>
            
            <div className={style.texts}>
                <h1 className={style.name}>{DogDetail.name}</h1>
                <p className={style.text}>ID: {DogDetail.id} </p>
                <p className={style.text}>Peso: {DogDetail.weight} kg </p>
                <p className={style.text}>Altura: {DogDetail.height} cm</p>
                <p className={style.text}>Años de vida: {lifeSpanWithoutYears} </p>
                <p className={style.text}>Temperamentos: {DogDetail.temperament ? DogDetail.temperament : tempReady} </p>
            </div>
        </div>
    )
}
export default Detail;
