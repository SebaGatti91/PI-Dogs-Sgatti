// Estilos
import "./App.css";
// Hooks
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
// Components to render
import HomePage from "./components/homePage/HomePage";
import LandingPage from "./components/landingPage/LandingPage";
import Nav from "./components/nav/Nav";
import DogForm from "./components/dogForm/DogForm";
import Detail from "./components/detail/Detail";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [access, setAccess] = useState(false);

  useEffect(() => {
    // Evitar que ponga directamente /home
    if (!access && location.pathname !== "/landing") {
      navigate("/landing");
    }
  }, [access, location, navigate]);

  // Función que maneja la navegación a la página "Home"
  const goToHome = () => {
    setAccess(true);
    navigate("/home");
  };

  return (
    <div className="App">
      {location.pathname !== "/landing" ? <Nav /> : ""}
      <Routes>
        <Route path="/landing" element={<LandingPage onButtonClick={goToHome} />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/add" element={<DogForm />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
};

export default App;
