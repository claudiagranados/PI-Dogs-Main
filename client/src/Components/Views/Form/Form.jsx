import Styles from "./Form.module.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDog, temperamentsDog } from "../../../Redux/actions";
import validation from './validations';


function Form() {
	const temperaments = useSelector(state => state.Temperaments); //traigo los temperamentos del estado global para mapear en options
	const dogs = useSelector(state => state.AllDogs); //traigo los perros del estado global para controlar no crear uno que ya este aqui
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(temperamentsDog());
	}, [dispatch]);

	//Estado local con valor de inputs
	const [state, setState] = useState({
		name: "",
		minHeight: 0,
		maxHeight: 0,
		minWeight: 0,
		maxWeight: 0,
		minlife_span: 0,
   		maxlife_span: 0,
		temperaments: [],
		imageUrl: "",
	});

	//-------------Manejo de errores-------------------
	const [errors, setErrors] = useState({
		name: "",
		minHeight: "",
		maxHeight: "",
		minWeight: "",
		maxWeight: "",
		minlife_span: "",
    	maxlife_span: "",
		temperaments: "",
		imageUrl: "",
	});

	const [submitDisabled, setSubmitDisabled] = useState(true); //estado para habilitar o deshabilitar el boton de submit

	const disabledHandler = () => {
		//habilita o deshabilita el boton de submit segun si estan completos los inputs
		const completeFields =
			state.name &&
			state.minHeight &&
			state.maxHeight &&
			state.minWeight &&
			state.maxWeight &&
			state.minlife_span &&
      		state.maxlife_span &&
			state.temperaments.length > 0 &&
			state.imageUrl;

		setSubmitDisabled(!completeFields);
	};

	//-------------------- Manejo de inputs ------------------------------------
	const handleChange = event => {
		setState({
			...state,
			[event.target.name]: event.target.value,
		});

		setErrors(
			//manejo de errores con validaciones
			validation(
				{
					...state,
					[event.target.name]: event.target.value
				},
				event.target.name
			)
		);

		disabledHandler();
		//console.log(state);
	};

	//--------------- Manejo de temperamentos seleccionados ---------------------
	const [selectedTemperament, setSelectedTemperament] = useState("");

  const temperamentHandler = event => {
    setSelectedTemperament(event.target.value);
  };

  const handleDeleteTemperaments = event => {
    setState({
      ...state,
      temperaments: state.temperaments.filter(el => el !== event),
    });
  };

  const temperamentSubmitHandler = event => {
    event.preventDefault();

    if (state.temperaments.includes(selectedTemperament)) {
      alert("Ya se ha agregado este temperamento, seleccione otro");
      return;
    }

    setState({
      ...state,
      temperaments: [...state.temperaments, selectedTemperament],
    });

    setSelectedTemperament("");

    if (ref.current) {
      ref.current.selectedIndex = -1;
    }
  };

  const ref = useRef(null); 
	//----------------- Dispatch de la accion de agregar perro ------------------

	let newDog = {
		//creo el objeto con los datos del perro para enviar al servidor
		name: state.name,
		height: `${state.minHeight} - ${state.maxHeight}`,
		weight: `${state.minWeight} - ${state.maxWeight}`,
    	life_span: `${state.minlife_span} - ${state.maxlife_span}`,
		temperament: state.temperaments,
		image: state.imageUrl,
	};

	const handleSubmit = event => {
		
		event.preventDefault();
		const imageExtension = state.imageUrl.substring(
			state.imageUrl.lastIndexOf('.') + 1
		  ).toLowerCase();
		  if (!['jpg', 'png', 'gif'].includes(imageExtension)) {
			alert('La imagen debe ser un archivo jpg, png o gif');
			return;
		  }

		if (
			dogs.some(
				dog => dog.name.trim().toLowerCase() === state.name.trim().toLowerCase()
			)
		) {
			alert("Ya hay un perrito con ese nombre, escribe otro");
			return;
		}

		if (
			errors.name ||
			errors.temperaments 
		
		  ) {
			alert("Completa los campos correctamente");
			return;
		  }
	  
		  if (parseInt(state.minHeight) > parseInt(state.maxHeight)) {
			alert("La altura mínima no puede ser mayor a la altura máxima");
			return;
		  }
	  
		  if (parseInt(state.minWeight) > parseInt(state.maxWeight)) {
			alert("El peso mínimo no puede ser mayor al peso máximo");
			return;
		  }
	  
		  if (parseInt(state.minlife_span) > parseInt(state.maxlife_span)) {
			alert("Los años de vida mínimos no pueden ser mayor a los años máximos");
			return;
		  }

		dispatch(postDog(newDog));

		setState({
			name: '',
			minHeight: 0,
			maxHeight: 0,
			minWeight: 0,
			maxWeight: 0,
			minlife_span: 0,
			maxlife_span: 0,
			temperaments: [],
			imageUrl: '',
		  });
	};

	return (
		<div className={Styles.container}>
			<form onSubmit={handleSubmit} className={Styles.form}>
				<label>
					Nombre del perrito:
					<input
						type="text"
						name="name"
						onChange={handleChange}
						value={state.name}
						placeholder="Ingresa el nombre"
						required
					/>
					{errors.name && <p className={Styles.error}>{errors.name}</p>}
				</label>

				<div className={Styles.inlineInputs}>
					<label>
						Altura min:
						<input
							type="text"
							name="minHeight"
							onChange={handleChange}
							placeholder="Ingresa la altura mínima"
							required
						/>
						{errors.minHeight && (
							<p className={Styles.error}>{errors.minHeight}</p>
						)}
					</label>
					<label>
						Altura max:
						<input
							onChange={handleChange}
							placeholder="Ingresa la altura máxima"
							type="text"
							name="maxHeight"
						/>
						{errors.maxHeight && (
							<p className={Styles.error}>{errors.maxHeight}</p>
						)}
					</label>
				</div>
				<div className={Styles.inlineInputs}>
					<label>
						Peso min:
						<input
							onChange={handleChange}
							placeholder="Ingresa el peso mínimo"
							type="text"
							name="minWeight"
						/>
						{errors.minWeight && (
							<p className={Styles.error}>{errors.minWeight}</p>
						)}
					</label>
					<label>
						Peso max:
						<input
							onChange={handleChange}
							placeholder="Ingresa el peso máximo"
							type="text"
							name="maxWeight"
						/>
						{errors.maxWeight && (
							<p className={Styles.error}>{errors.maxWeight}</p>
						)}
					</label>
				</div>
        <div className={Styles.inlineInputs}>
				<label>
					Años de vida min:
					<input
						onChange={handleChange}
						placeholder="Ingresa años mínimos"
						type="text"
						name="minlife_span"
					/>
					{errors.minlife_span && (
						<p className={Styles.error}>{errors.minlife_span}</p>
					)}
				</label>
        <label>
					Años de vida max:
					<input
						onChange={handleChange}
						placeholder="Ingresa años máximos"
						type="text"
						name="maxlife_span"
					/>
					{errors.maxlife_span && (
						<p className={Styles.error}>{errors.maxlife_span}</p>
					)}
				</label>
        </div>
				<label>
				
          <select className={Styles.temperamentform}
                onChange={(event) => temperamentHandler(event)} 
              >
                <option hidden >Temperamentos:</option>
                {temperaments?.map((el) => (
                  <option value={el.name} key={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>

					<button className={Styles.addTemp} onClick={temperamentSubmitHandler}>
						Agregar
					</button>
          
					{errors.temperaments && (
						<p className={Styles.error}>{errors.temperaments}</p>
					)}
          {state.temperaments.map((el) => (
            <div key={el}>

              <button
                onClick={() => handleDeleteTemperaments(el)}
              >
                {el}
              </button>
            </div>
          ))}

				</label>
				<label>
					Imagen url:
					<input
						onChange={handleChange}
						placeholder="Ingresa url de la imagen"
						type="text"
						name="imageUrl"
					/>
					{errors.imageUrl && <p className={Styles.error}>{errors.imageUrl}</p>}
				</label>

				<button
					className={Styles.submitBtn}
					value="Crear"
					onClick={handleSubmit}
					type="submit"
					disabled={submitDisabled}
				>
					Agregar
				</button>
				{submitDisabled ? (
					<p className={Styles.submitDisabled}>
						Llena todos los campos para crear el perrito
					</p>
				) : null}
			</form>
      
		</div>
	);
}

export default Form;
