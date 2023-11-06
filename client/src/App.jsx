/* style */
import "./App.css";

/* componentes to render */
import HomePage from "./components/homePage/HomePage";
import LandingPage from "./components/landingPage/LandingPage";
import Nav from "./components/nav/Nav";
import DogForm from "./components/dogForm/DogForm"
import Detail from "./components/detail/Detail"

/* hooks */
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchDogs, getAllDogs} from "./redux/actions"; // Importa tu acción
import { useDispatch } from "react-redux"; // Importa useSelector y useDispatch de react-redux

const App = () => {
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);
  const dispatch = useDispatch(); // Obtiene la función dispatch de Redux
 

  useEffect(() => {
    // evita que ponga directamente /home
    !access && navigate("/landing");
  }, [access]);

  // Función que maneja la navegación a la página "Home"
  const goToHome = () => {
    setAccess(true);
    navigate("/home");
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


  // Resto de tu componente con la paginación y demás

  return (
    <div className="App">
      {location.pathname !== "/landing" ? <Nav  /> : ""}
      <Routes>
        <Route path="/landing" element={<LandingPage onButtonClick={goToHome} />} />
        <Route path="/home" element={<HomePage onSearch={onSearch}/>} />
        <Route path="/add" element={<DogForm/>} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
};

export default App;
