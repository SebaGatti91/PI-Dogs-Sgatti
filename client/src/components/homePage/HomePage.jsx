//Estilos
import styles from "./HomePage.module.css";
//Hooks
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
//Actions
import { getAllDogs, getTemperaments } from "../../redux/actions";
import {
  setOrder,
  setSource,
  setFilter,
  applyFilters,
  temperamentFilter,
} from "../../redux/actions";
//Components to render
import DogCard from "../dogCard/DogCard";
import SearchBar from "../searchBar/SearchBar";

const HomePage = () => {
  //Hooks
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);

  //Dispatch
  const dispatch = useDispatch();

  //State
  const { dogs, temperaments } = useSelector((state) => state);

  // Ordena los temperamentos alfabéticamente
  const sortedTemperaments = temperaments.sort((a, b) =>
    a.temperament.localeCompare(b.temperament)
  );

  // Permite manejar el cambio de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  //Traigo todos los perros y temperamentos al cagar home
  useEffect(() => {
    dispatch(getAllDogs()), dispatch(getTemperaments());
  }, []);

  // Despacho la acción temperamentFilter con los temperamentos seleccionados
  useEffect(() => {
    dispatch(temperamentFilter(selectedTemperaments));
    setCurrentPage(1)
  }, [selectedTemperaments]); // Escucha los cambios en selectedTemperaments

  //Handlers

  //Temperametos seleccionados para filtrar
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

  //Filtro ascendente descendente
  const handleOrderChange = (event) => {
    dispatch(setOrder(event.target.value));
  };

  //Filtro de raza o peso
  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  //Seteo de filtro
  const handleApplyFilters = () => {
    dispatch(applyFilters());
    setCurrentPage(1)
  };

  //Filtro de fuente (Api o DB)
  const handleSourceChange = (event) => {
    dispatch(setSource(event.target.value));
    setCurrentPage(1)
  };

  //Constantes para manejo de paginado
  const dogsPerPage = 8;
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;

  const totalPages = Math.ceil(dogs.length / dogsPerPage);

  return (
    <div className={styles.HomePage}>
      <SearchBar />
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
      <h3>Selecciona Temperamentos Para Filtrar:</h3>
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
      <div class={styles.footer}>Creado Por: Sebastián A. Gatti</div>
    </div>
  );
};

export default HomePage;
