/* style */
import "./App.css";

/* componentes to render */
import HomePage from "./components/homePage/HomePage";
import LandingPage from "./components/landingPage/LandingPage";

/* hooks */
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const App = () => {
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);

  useEffect(() => {
    // evita que ponga directamente /home
    !access && navigate("/landing");
  }, [access]);

  // Función que maneja la navegación a la página "Home"
  const goToHome = () => {
    setAccess(true);
    navigate("/home");
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/landing"
          element={<LandingPage onButtonClick={goToHome} />}
        />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
