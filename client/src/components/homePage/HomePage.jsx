import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllDogs, getTemperaments  } from "../../redux/actions";
import DogCard from "../dogCard/DogCard";
import styles from "./HomePage.module.css";
import SearchBar from "../searchBar/SearchBar";
import { setOrder, setSource, setFilter, applyFilters, temperamentFilter } from "../../redux/actions";

const HomePage = ({onSearch}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const dispatch = useDispatch();

  //Permite manejar el cambio de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    dispatch(getAllDogs());
  }, []);


  useEffect(() => {
    dispatch(getTemperaments());
  }, []);
  
  useEffect(() => {
    // Despacha la acción temperamentFilter con los temperamentos seleccionados
    dispatch(temperamentFilter(selectedTemperaments));
  }, [selectedTemperaments]); // Escucha los cambios en selectedTemperaments


  const handleTemperamentChange = (temperamentId) => {
    if (selectedTemperaments.includes(temperamentId)) {
      setSelectedTemperaments((prevSelected) =>
        prevSelected.filter((id) => id !== temperamentId)
      );
    } else {
      setSelectedTemperaments((prevSelected) => [
        ...prevSelected,
        temperamentId,
      ]);
    }
  };

  const handleOrderChange = (event) => {
    dispatch(setOrder(event.target.value));
  };

  const handleSourceChange = (event) => {
    dispatch(setSource(event.target.value));
  };

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const handleApplyFilters = () => {
    dispatch(applyFilters());
  };

  const { dogs, temperaments } = useSelector((state) => state); //selecciono todo mi estado global y me traigo dogs y temperaments por destructuring

  const dogsPerPage = 8;
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;

  const totalPages = Math.ceil(dogs.length / dogsPerPage);

  return (
    <div>
      <SearchBar onSearch={onSearch} />
      <select onChange={handleOrderChange}>
        <option value="Ascendente">Ascendente</option>
        <option value="Descendente">Descendente</option>
      </select>
      <select onChange={handleFilterChange}>
        <option value="Raza">Raza</option>
        <option value="Peso">Peso</option>
      </select>
      <button onClick={handleApplyFilters}>Aplicar Filtros</button>
      <select onChange={handleSourceChange}>
        <option value="Todos">Todos</option>
        <option value="Database">Base de datos</option>
        <option value="Api">Api</option>
      </select>
      <h3>Selecciona temperamentos para filtrar:</h3>
      <div className={styles.scrollableList}>
        {temperaments.map((temperament) => (
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
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
      {dogs
        ?.slice(indexOfFirstDog, indexOfLastDog)
        .map(({ id, name, image, temperament, weight }) => {
          return (
            <DogCard
              key={id}
              id={id}
              image={image}
              name={name}
              temperament={temperament}
              weight={weight}
            />
          );
        })}
    </div>
  );
};

export default HomePage;
