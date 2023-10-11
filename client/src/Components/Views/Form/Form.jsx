
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../Form/Form.module.css";
import { postDog, temperamentsDog } from "../../../Redux/actions";

export default function Form() {
  const dispatch = useDispatch();
  const temperament = useSelector((state) => state.Temperaments);
  const [errors, setErrors] = useState({});
  let [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
    image_url: "",
    temperament: [],
  });

  function handleInputChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (Object.values(errors).length === 0 && input.temperament.length !== 0) {
      const postData = {
        name: input.name,
        image: input.image_url,
        height: `${input.heightMin} - ${input.heightMax}`,
        weight: `${input.weightMin} - ${input.weightMax}`,
        life_span: input.life_span,
        temperaments: input.temperament,
      };

      dispatch(postDog(postData));
      alert("Perrito creado");
    } else {
      alert(
        "Información incompleta"
      );
    }
  }

  function handleSelect(event) {
    if (input.temperament.length < 3) {
      setInput({
        ...input,
        temperament: [...input.temperament, event.target.value],
      });
      let temps = input.temperament;
      let findTemp = temps.indexOf(event.target.value);
      if (findTemp >= 0) {
        temps.splice(findTemp, 1);
      } else {
        temps.push(event.target.value);
      }
      setInput({
        ...input,
        temperament: temps,
      });
    } else {
      alert("Solo puedes seleccionar 3 temperamentos");
    }
  }

  function handleDeleteTemperaments(event) {
    setInput({
      ...input,
      temperament: input.temperament.filter((el) => el !== event),
    });
  }

  useEffect(() => {
    dispatch(temperamentsDog());
  }, [dispatch]);

  return (
    <div >
      <div className={style.divformh1}>
        <h1 className={style.h1form}>Nuevo perrito</h1>
      </div>

      <div className={style.divform}>
        <div >
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className={style.labeldogsnamediv} >
              <label className={style.labeldogsname}>Nombre</label>
              <input
                onChange={(event) => handleInputChange(event)}
                type="text"
                name="name"
                value={input.name}
                required
                className={style.inputdogsname}
              />
              <span className={style.errorsdogsname}>
                {errors.name && <p>{errors.name}</p>}
              </span>
            </div>

            <div className={style.labelminheightdiv}>
              <label className={style.labeldogsname}>Min. Height </label>
              <input
                onChange={(event) => handleInputChange(event)}
                type="text"
                name="heightMin"
                value={input.heightMin}
                required
                className={style.inputdogsname}
              />
              <span span className={style.errorsdogsname}>
                {errors.heightMin && <p>{errors.heightMin}</p>}
              </span>
            </div>

            <div className={style.labeldogsnamediv} >
              <label className={style.labeldogsname} >Max. Height </label>
              <input
                onChange={(event) => handleInputChange(event)}
                type="text"
                name="heightMax"
                value={input.heightMax}
                required
                className={style.inputdogsname}
              />
              <span className={style.errorsdogsname}>
                {errors.heightMax && <p>{errors.heightMax}</p>}
              </span>
            </div>

            <div className={style.labeldogsnamediv} >
              <label className={style.labeldogsname}>Min. Weight </label>
              <input
                onChange={(event) => handleInputChange(event)}
                type="text"
                name="weightMin"
                value={input.weightMin}
                required
                className={style.inputdogsname}
              />
              <span className={style.errorsdogsname}>
                {errors.weightMin && <p>{errors.weightMin}</p>}
              </span>
            </div>

            <div className={style.labeldogsnamediv} >
              <label className={style.labeldogsname}>Max. Weight </label>
              <input
                onChange={(event) => handleInputChange(event)}
                type="text"
                name="weightMax"
                value={input.weightMax}
                required
                className={style.inputdogsname}
              />
              <span className={style.errorsdogsname}>
                {errors.weightMax && <p>{errors.weightMax}</p>}
              </span>
            </div>

            <div className={style.labeldogsnamediv} >
              <label className={style.labeldogsname}> Años de vida </label>
              <input
                onChange={(event) => handleInputChange(event)}
                type="text"
                name="life_span"
                value={input.life_span}
                required
                className={style.inputdogsname}
              />
              <span className={style.errorsdogsname}>
                {errors.life_span && <p>{errors.life_span}</p>}
              </span>
            </div>

            <div className={style.labeldogsnamediv} >
              <label className={style.labeldogsname}>Image URL </label>
              <input
                onChange={(event) => handleInputChange(event)}
                type="text"
                name="image_url"
                value={input.image_url}
                required
                className={style.inputdogsname}
              />
              <span className={style.errorsdogsname}>
                {errors.image_url && <p>{errors.image_url}</p>}
              </span>
            </div>

            <div>
              <select className={style.temperamentform}
                onChange={(event) => handleSelect(event)} 
              >
                <option hidden >Temperaments</option>
                {temperament?.map((el) => (
                  <option value={el.name} key={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
              
              <button type="submit" className={style.temperamentform}>
                CREAR PERRITO
              </button>
            </div>
          </form>
          {input.temperament.map((el) => (
            <div key={el}>
              <button
                onClick={() => handleDeleteTemperaments(el)}
              >
                {el}
              </button>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}

function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "El nombre es requerido";
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(input.name)) {
    errors.name = "El nombre solo puede contener letras";
  }

  if (!input.heightMin) {
    errors.heightMin = "La altura mínima es requerida";
  } else if (!/^([0-9])*$/.test(input.heightMin)) {
    errors.heightMin = "Solo puede ser un numero";
  } else if (input.heightMin < 1 || input.heightMin > 50) {
    errors.heightMin = "Solo puede ser entre 0 y 50 cm";
  }

  if (!input.heightMax) {
    errors.heightMax = "La altura máxima es requerida";
  } else if (!/^([0-9])*$/.test(input.heightMax)) {
    errors.heightMax = "Solo puede ser un numero";
  } else if (input.heightMax > 100) {
    errors.heightMax = "No puede ser mayor a 100 cm";
  } else if (input.heightMax === input.heightMin) {
    errors.heightMax = "La altura máxima no puede ser igual a la mínima";
  }

  if (!input.weightMin) {
    errors.weightMin = "El peso mínimo es requerido";
  } else if (!/^([0-9])*$/.test(input.weightMin)) {
    errors.weightMin = "Solo puede ser un numero";
  } else if (input.weightMin < 1 || input.weightMin > 50) {
    errors.weightMin = "Solo puede ser entre 0 y 50 Kgs";
  }

  if (!input.weightMax) {
    errors.weightMax = "El peso máximo es requerido";
  } else if (!/^([0-9])*$/.test(input.weightMax)) {
    errors.weightMax = "Solo puede ser un numero";
  } else if (input.weightMax > 100) {
    errors.weightMax = "No puede ser mayor a 100 Kgs";
  } else if (input.weightMax === input.weightMin) {
    errors.weightMax = "El peso máximo no puede ser igual al minimo";
  }

  if (!input.life_span) {
    errors.life_span = "Los años de vida son requeridos";
  } else if (!/^([0-9])*$/.test(input.life_span)) {
    errors.life_span = "Solo puede ser un numero";
  }

  if (!input.temperament) {
    errors.temperament = "Los temperamentos son requeridos";
  }

  return errors;
}
