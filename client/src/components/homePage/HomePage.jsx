import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllDogs, getTemperaments } from "../../redux/actions";
import {
  setOrder,
  setSource,
  setFilter,
  applyFilters,
  temperamentFilter,
} from "../../redux/actions";
import DogCard from "../dogCard/DogCard";
import styles from "./HomePage.module.css";
import SearchBar from "../searchBar/SearchBar";

const HomePage = ({ onSearch }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const dispatch = useDispatch();

  // Permite manejar el cambio de página
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

  const { dogs, temperaments } = useSelector((state) => state);

  // Ordena los temperamentos alfabéticamente
  const sortedTemperaments = temperaments.sort((a, b) =>
    a.temperament.localeCompare(b.temperament)
  );

  const dogsPerPage = 8;
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;

  const totalPages = Math.ceil(dogs.length / dogsPerPage);

  return (
    <div className="home-page">
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
        <button
      onClick={() => handlePageChange(1)}
      disabled={currentPage === 1}
    >
      Primera
    </button>
    <button
      onClick={() => handlePageChange(totalPages)}
      disabled={currentPage === totalPages}
    >
      Última
    </button>
      </div>
      <div className="page-info">
        Página {currentPage} de {totalPages}
      </div>
      <div className={styles.grid}>
        {dogs
          ?.slice(indexOfFirstDog, indexOfLastDog)
          .map(({ id, name, image, temperament, weight }) => {
            return (
              <div key={id}>
                <DogCard
                  id={id}
                  name={name}
                  image={image}
                  temperament={temperament}
                  weight={weight}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HomePage;
