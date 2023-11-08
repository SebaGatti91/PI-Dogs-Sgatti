//Estilos
import styles from "./DogForm.module.css";
//Hooks
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//Actions
import { PostDog } from "../../redux/actions";
//Archivo validación
import validation from "../../validation";

const DogForm = () => {
  //Dispatch
  const dispatch = useDispatch();

  //Hooks
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    weight_max: 0,
    weight_min: 0,
    height_max: 0,
    height_min: 0,
    life_max: 0,
    life_min: 0,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  //State redux
  const { temperaments } = useSelector((state) => state);

  //Temperamentos 
  const sortedTemperaments = temperaments.sort((a, b) =>
  a.temperament.localeCompare(b.temperament)
);

  useEffect(() => {
    if (
      formData.name != "" ||
      formData.image != "" ||
      formData.weight_max != 0 ||
      formData.weight_min != 0 ||
      formData.height_max != 0 ||
      formData.height_min != 0 ||
      formData.life_max != 0 ||
      formData.life_min != 0
    ){
      const userValidated = validation(formData, selectedTemperaments);

      // Verificar si hay errores
      if (Object.keys(userValidated).length > 0) {
        setIsSubmitDisabled(true); // Deshabilitar el botón de envío
      } else {
        setIsSubmitDisabled(false); // Habilitar el botón de envío si no hay errores
      }

      setErrors(userValidated);
    }
  }, [formData]);


  //Events

  //Adquisición datos formularios
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  //Selección temperamentos
  const handleTemperamentChange = (temperamentName) => {
    if (selectedTemperaments.includes(temperamentName)) {
      setSelectedTemperaments((prevSelected) =>
        prevSelected.filter((name) => name !== temperamentName)
      );
    } else {
      setSelectedTemperaments((prevSelected) => [
        ...prevSelected,
        temperamentName,
      ]);
    }
  };

  useEffect(() => {
    const userValidated = validation(formData, selectedTemperaments);
    
    setErrors(userValidated);
         // Verificar si hay errores
         if (Object.keys(userValidated).length > 0) {
          setIsSubmitDisabled(true); // Deshabilitar el botón de envío
        } else {
          setIsSubmitDisabled(false); // Habilitar el botón de envío si no hay errores
        }
    
  }, [selectedTemperaments])

  //Ordenamiento de datos para envío
  const handleSubmit = (event) => {
    event.preventDefault();
    const combinedData = {
      weight: `${formData.weight_min} - ${formData.weight_max}`,
      height: `${formData.height_min} - ${formData.height_max}`,
      life_span: `${formData.life_min} - ${formData.life_max}`,
      name: formData.name,
      image: formData.image,
      temperament: selectedTemperaments.join(", "),
    };
    dispatch(PostDog(combinedData));
    alert("Datos cargados");
  };
  

  return (
    <div className={styles.backgroundContainer}>
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formField}>
        <label htmlFor="name">Nombre: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      {<p style={{ color: "red" }}>{errors.name}</p>}

      <div className={styles.formField}>
        <label htmlFor="image">Imagen: </label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>

      {<p style={{ color: "red" }}>{errors.image}</p>}

      <div className={styles.formField}>
        <label htmlFor="weight_min">Peso Mínimo: </label>
        <input
          type="number"
          name="weight_min"
          value={formData.weight_min}
          onChange={handleChange}
        />
      </div>

      {<p style={{ color: "red" }}>{errors.weight_min}</p>}

      <div className={styles.formField}>
        <label htmlFor="weight_max">Peso Máximo: </label>
        <input
          type="number"
          name="weight_max"
          value={formData.weight_max}
          onChange={handleChange}
        />
      </div>

      {<p style={{ color: "red" }}>{errors.weight_max}</p>}

      <div className={styles.formField}>
        <label htmlFor="life_min">Edad Mínima: </label>
        <input
          type="number"
          name="life_min"
          value={formData.life_min}
          onChange={handleChange}
        />
      </div>

      {<p style={{ color: "red" }}>{errors.life_min}</p>}

      <div className={styles.formField}>
        <label htmlFor="life_max">Edad Máxima: </label>
        <input
          type="number"
          name="life_max"
          value={formData.life_max}
          onChange={handleChange}
        />
      </div>
      
      {<p style={{ color: "red" }}>{errors.life_max}</p>}

      <div className={styles.formField}>
        <label htmlFor="height_min">Altura Mínima: </label>
        <input
          type="number"
          name="height_min"
          value={formData.height_min}
          onChange={handleChange}
        />
      </div>

      
      {<p style={{ color: "red" }}>{errors.height_min}</p>}

      <div className={styles.formField}>
        <label htmlFor="height_max">Altura Máxima: </label>
        <input
          type="number"
          name="height_max"
          value={formData.height_max}
          onChange={handleChange}
        />
      </div>

      
      {<p style={{ color: "red" }}>{errors.height_max}</p>}

      <h3>Selecciona Temperamentos Para Agregar:</h3>
      <div className={styles.scrollableList}>
        {sortedTemperaments.map((temperament) => (
          <div key={temperament.id}>
            <label>
              <input
                type="checkbox"
                value={temperament.temperament}
                checked={selectedTemperaments.includes(temperament.temperament)}
                onChange={() =>
                  handleTemperamentChange(temperament.temperament)
                }
              />
              {temperament.temperament}
            </label>
          </div>
        ))}
      </div>
      {<p style={{ color: "red" }}>{errors.temperaments}</p>}
      <button type="submit" disabled={isSubmitDisabled}>Agregar</button>
    </form>
    </div>
  );
};

export default DogForm;
