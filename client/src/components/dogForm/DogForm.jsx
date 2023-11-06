import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostDog } from "../../redux/actions";
import styles from "./DogForm.module.css";

const DogForm = () => {
  const dispatch = useDispatch();
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const { temperaments } = useSelector((state) => state);

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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

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

  const sortedTemperaments = temperaments.sort((a, b) =>
    a.temperament.localeCompare(b.temperament)
  );

  return (
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

      <div className={styles.formField}>
        <label htmlFor="image">Imagen: </label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formField}>
        <label htmlFor="weight_min">Peso mínimo: </label>
        <input
          type="number"
          name="weight_min"
          value={formData.weight_min}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formField}>
        <label htmlFor="weight_max">Peso máximo: </label>
        <input
          type="number"
          name="weight_max"
          value={formData.weight_max}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formField}>
        <label htmlFor="life_min">Edad mínima: </label>
        <input
          type="number"
          name="life_min"
          value={formData.life_min}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formField}>
        <label htmlFor="life_max">Edad máxima: </label>
        <input
          type="number"
          name="life_max"
          value={formData.life_max}
          onChange={handleChange}
        />
      </div>
      
      <div className={styles.formField}>
        <label htmlFor="height_min">Altura mínima: </label>
        <input
          type="number"
          name="height_min"
          value={formData.height_min}
          onChange={handleChange}
        />
      </div>


      <div className={styles.formField}>
        <label htmlFor="height_max">Altura máxima: </label>
        <input
          type="number"
          name="height_max"
          value={formData.height_max}
          onChange={handleChange}
        />
      </div>

      <h3>Selecciona temperamentos para agregar:</h3>
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default DogForm;
