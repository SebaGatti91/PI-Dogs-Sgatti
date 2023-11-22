import { useState } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux"; // Asegúrate de importar useDispatch desde react-redux
import { getAllDogs, searchDogs,setSource } from "../../redux/actions"; // Asegúrate de importar tus acciones de Redux

const SearchBar = () => {
  const [name, setName] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const dispatch = useDispatch(); // Obtén la función de despacho de Redux

  const handleChange = (event) => {
    const newName = event.target.value;
    setName(newName);

    // Cancelar la búsqueda anterior si el usuario sigue escribiendo
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Establecer un nuevo temporizador para la búsqueda después de 300 ms
    setSearchTimeout(
      setTimeout(() => {
        onSearch(newName);
      }, 300)
    );
  };

  // Función que maneja la búsqueda utilizando Redux
  const onSearch = async (name) => {
    try {
      if (name.trim() === "") {
        dispatch(getAllDogs()); // Llama a getAllDogs si la cadena de búsqueda está vacía
      } else {
        dispatch(searchDogs(name));
      }
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="search"
        onChange={handleChange}
        value={name}
        placeholder="Buscar por nombre..."
      />
    </div>
  );
};

export default SearchBar;