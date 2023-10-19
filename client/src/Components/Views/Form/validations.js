const validation = (state, name) => {
	let errors = {};
	let regExpression = /^https?:\/\/.*\.(jpg|png|gif)$/;
  
	switch (name) {
	  case "name":
		if (!state.name) {
		  errors.name = "Ingresa un nombre";
		} else if (/[0-9]/.test(state.name)) {
		  errors.name = "El nombre no puede tener números";
		}
		break;
  
	  case "minHeight":
		if (!state.minHeight) {
		  errors.minHeight = "Es necesaria la altura mínima";
		} else if (isNaN(state.minHeight)) {
		  errors.minHeight = "La altura tiene que ser un número";
		} else if (parseInt(state.minHeight) > parseInt(state.maxHeight)) {
		  errors.minHeight = "La altura mínima no puede ser mayor a la altura máxima";
		}
		break;
  
	  case "maxHeight":
		if (!state.maxHeight) {
		  errors.maxHeight = "Es necesaria la altura máxima";
		} else if (isNaN(state.maxHeight)) {
		  errors.maxHeight = "La altura tiene que ser un número";
		} else if (parseInt(state.maxHeight) < parseInt(state.minHeight)) {
		  errors.maxHeight = "La altura máxima no puede ser menor a la altura mínima";
		}
		break;
  
	  case "minWeight":
		if (!state.minWeight) {
		  errors.minWeight = "Es necesario el peso mínimo";
		} else if (isNaN(state.minWeight)) {
		  errors.minWeight = "El peso tiene que ser un número";
		} else if (parseInt(state.minWeight) > parseInt(state.maxWeight)) {
		  errors.minWeight = "El peso mínimo no puede ser mayor al peso máximo";
		}
		break;
  
	  case "maxWeight":
		if (!state.maxWeight) {
		  errors.maxWeight = "Es necesario el peso máximo";
		} else if (isNaN(state.maxWeight)) {
		  errors.maxWeight = "El peso tiene que ser un número";
		} else if (parseInt(state.maxWeight) < parseInt(state.minWeight)) {
		  errors.maxWeight = "El peso máximo no puede ser menor al peso mínimo";
		}
		break;
  
	  case "minlife_span":
		if (!state.minlife_span) {
		  errors.minlife_span = "Es necesario ingresar años de vida mínimos";
		} else if (isNaN(state.minlife_span)) {
		  errors.minlife_span = "Los años tienen que ser un número";
		} else if (parseInt(state.minlife_span) > 50) {
		  errors.minlife_span = "Años de vida debe ser menor a 50";
		} else if (parseInt(state.minlife_span) > parseInt(state.maxlife_span)) {
		  errors.minlife_span = "Los años de vida mínimos no pueden ser mayor a los años máximos";
		}
		break;
  
	  case "maxlife_span":
		if (!state.maxlife_span) {
		  errors.maxlife_span = "Es necesario ingresar años de vida máximos";
		} else if (isNaN(state.maxlife_span)) {
		  errors.maxlife_span = "Los años tienen que ser un número";
		} else if (parseInt(state.maxlife_span) > 50) {
		  errors.maxlife_span = "Años de vida debe ser menor a 50";
		} else if (parseInt(state.maxlife_span) < parseInt(state.minlife_span)) {
		  errors.maxlife_span = "Los años de vida máximos no pueden ser menor a los años mínimos";
		}
		break;
  
	  case "temperaments":
		if (state.temperaments.length < 1) {
		  errors.temperaments = "Al menos un temperamento es necesario";
		}
		break;
  
	  case "imageUrl":
		if (!state.imageUrl) {
		  errors.imageUrl = "Es necesario ingresar una imagen";
		}
		if (!regExpression.test(state.imageUrl)) {
		  errors.imageUrl = "El formato de la imagen solo puede ser JPG, GIF o PNG";
		}
		break;
  
	  default:
		break;
	}
  
	return errors;
  };
  
  export default validation;
  