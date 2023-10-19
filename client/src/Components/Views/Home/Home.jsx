import Card from "../../Card/Card";
import { TodosLosDogs } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";

const Cards = () => {
	//para saber si ya se cargaron los datos de la api 
	const [dataLoaded, setDataLoaded] = useState(false);

	//Estado dogs de la store
	const dogs = useSelector(state => state.AllDogs);

	const dispatch = useDispatch();

	//-----------Paginado Anterior y Siguiente----------------

	//se modifica current page con los handlers
	//cambian los valores de start y end
	//se modifica current dogs con el slice(start,end)

	const elementPerPage = 8;
	const [currentPage, setCurrentPage] = useState(0);

	let start = currentPage * elementPerPage; //inicio de la pagina actual para hacer el slice, si currentPage es 0, start es 0, si currentPage es 1, start es 8, si currentPage es 2, start es 16, etc
	let end = start + elementPerPage; //fin de la pagina actual para hacer el slice, si currentPage es 0, end es 8, si currentPage es 1, end es 16, si currentPage es 2, end es 24, etc

	const currentDogs = Array.isArray(dogs) ? dogs.slice(start, end) : [];

	const handlerNextPage = () => {
		if (end < dogs.length) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlerPrevPage = () => {
		if (start > 0) {
			setCurrentPage(currentPage - 1);
		}
	};

	
	const maxPageNumbers = 9; //  muestro 5 botones en el medio

	const renderPageNumbers = () => {
		const pageNumbers = []; //dentro de este array voy a pushear los botones intermedios
		const totalPages = Math.ceil(dogs.length / elementPerPage); //calculo de la cantidad de paginas totales que puede mostrar cada boton

		let startPage = Math.max(
			currentPage - Math.floor(maxPageNumbers / 2), //calculo cual va a ser el primer boton
			0
		);
		//math.max(0 - 2, 0) =>>> 0

		let endPage = Math.min(
			//calculo cual va a ser el ultimo boton intermedio
			startPage + maxPageNumbers - 1,
			totalPages - 1
		);
		//math.min(0+5-1, 5-1) =>>> 4

		//    21	-  18   <        5    -        1
		if (endPage - startPage < maxPageNumbers - 1) {
			startPage = Math.max(endPage - maxPageNumbers + 1, 0); //evitar que en las ultimas paginas se muestren menos de 5 botones
		} // 21  - 5 + 1

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(
				<button
					key={i}
					className={`${styles.inter} ${
						i === currentPage ? styles.activeButton : "" //colorear pagina en la que me encuentro
					}`}
					onClick={() => setCurrentPage(i)}
				>
					{i + 1}{" "}
					{/* i+1 porque arranca en 0 y quiero mostrar 1 y asi con todos los botones */}
				</button>
			);
		}
		return pageNumbers;
	};

	//controlar el renderizado de la pagina
	useEffect(
		() => {
			//Hago dispatch para obtener los perros  la api
			dispatch(TodosLosDogs()).then(() => {
				setDataLoaded(true); // Cambio a true el data loaded una vez que obtengo todos los datos para que se renderize
			});
		},
		[dispatch],
		dogs
	);

	return (
		<div>
			{dataLoaded ? ( //si dataLoaded es true renderiza
				<div>
					{currentDogs.length === 0 ? (
						<p>
							No se encontraron perritos
							<br />
							intenta en otra página
						</p>
					) : null}
					<div className={styles.container}>
						{currentDogs.map(dog => {
							const dogTemperament = dog.temperament
								? dog.temperament
								: dog.Temperaments
								? dog.Temperaments.map(temperament => temperament.name).join(
										", "
								  )
								: "";
							return (
								<Card
									key={dog.id}
									id={dog.id}
									name={dog.name}
									temperament={dogTemperament}
									weight={dog.weight}
									image={dog.image}
								/>
							);
						})}
					</div>

					<div className={styles.buttons_container}>
						<button
							className={styles.next}
							onClick={handlerPrevPage}
							disabled={currentPage === 0}
						>
							Anterior
						</button>
						{renderPageNumbers()} {/*botones intermedios */}
						<button
							className={styles.next}
							onClick={handlerNextPage}
							disabled={end >= dogs.length}
						>
							Siguiente
						</button>
					</div>
				</div>
			) : (
				<p>Los perritos se están cargando...</p>
			)}
		</div>
	);
};



export default Cards;
