const validation = (formData, selectedTemperaments) => {
  const errors = {};


  if (!/^[A-Z][a-zA-Z]*( [A-Z][a-zA-Z]*)?$/.test(formData.name)) {
    errors.name = "El nombre de la raza del perro debe comenzar con mayúscula y puede contener hasta dos palabras.";
  } else if (formData.name.length > 30) { 
    errors.name = "El nombre de la raza del perro no puede tener más de treinta caracteres.";
  }

  if (!/^(https?:\/\/)?\S+\.(png|jpg|jpeg|gif|bmp)$/i.test(formData.image)) {
    errors.image = "Por favor, ingresa una URL válida para la imagen (png, jpg, jpeg, gif o bmp).";
  }

  if (formData.weight_max < 2 || formData.weight_max > 100) {
    errors.weight_max = "El peso máximo debe estar entre 2 y 100.";
  }
  
  if (formData.weight_min < 2 || formData.weight_min > 100) {
    errors.weight_min = "El peso mínimo debe estar entre 2 y 100.";
  }
  
  if (+formData.weight_min > +formData.weight_max) {
    errors.weight_max = "El peso máximo debe ser mayor que el peso mínimo.";
  }

  if (formData.life_max < 3 || formData.life_max > 20) {
    errors.life_max = "La esperanza de vida máxima debe estar entre 3 y 20 años.";
  }
  
  if (formData.life_min < 3 || formData.life_min > 20) {
    errors.life_min = "La esperanza de vida mínima debe estar entre 3 y 20 años.";
  }
  
  if (+formData.life_min >= +formData.life_max) {
    errors.life_max = "La esperanza de vida máxima debe ser mayor que la esperanza de vida mínima.";
  }

  if ( formData.height_min <  30 || formData.height_min > 100) {
    errors.height_min = "La altura deve estar entre 30cm y 100cm.";
  }
  
  if (formData.height_max <  30 || formData.height_max > 100 ) {
    errors.height_max = "La altura deve estar entre 30cm y 100cm.";
  }

  if (+formData.height_min >= +formData.height_max) {
    errors.height_max = "La altura máxima debe ser mayor que la altura mínima.";
  }

  if (selectedTemperaments.length == 0 || selectedTemperaments.length > 5 ) {
    errors.temperaments = "Seleccione al menos un temperamento (máximo 5).";
  }
  return errors;
};

export default validation;
