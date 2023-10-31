import {
  SEARCH,
  GETDOGS,
  GETTEMP,
  SET_FILTER,
  SET_ORDER,
  SET_SOURCE,
  APPLY_FILTERS,
  TEMPERAMENT_FILTER,
} from "./action-types";

const initialState = {
  dogs: [],
  temperaments: [],
  originalDogs: [],
  filter: "Raza", // Valor predeterminado por nombre
  order: "Ascendente", // Valor predeterminado por nombre
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GETDOGS:
      return {
        ...state,
        dogs: action.payload, // copia de los resultados para manipular
        originalDogs: action.payload,
      };

    case SEARCH:
      return {
        ...state,
        dogs: action.payload, // Almacena los resultados de la búsqueda
      };

    case GETTEMP:
      return {
        ...state,
        temperaments: action.payload, // Almacena los resultados de los temperamentos
      };

    case SET_FILTER: {
      return {
        ...state,
        filter: action.payload, // Almacena el filtrado
      };
    }

    case SET_ORDER: {
      return {
        ...state,
        order: action.payload, // Almacena el filtrado
      };
    }

    case APPLY_FILTERS: {
      const filter = state.filter;
      const order = state.order;

      // Filtrar y ordenar los perros según los valores actuales de filter y order
      let filteredDogs = state.dogs;
      // Ordenar los perros en base a la condición
      if (filter === "Raza" && order === "Ascendente") {
        filteredDogs.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filter === "Raza" && order === "Descendente") {
        filteredDogs.sort((a, b) => b.name.localeCompare(a.name));
      } else if (filter === "Peso" && order === "Ascendente") {
        filteredDogs.sort((a, b) => {
          const weightA = parseInt(a.weight.split(" - ")[1]);
          const weightB = parseInt(b.weight.split(" - ")[1]);
          if (weightA === weightB) {
            // Si los pesos máximos son iguales, compara los pesos mínimos
            const minWeightA = parseInt(a.weight.split(" - ")[0]);
            const minWeightB = parseInt(b.weight.split(" - ")[0]);
            return minWeightA - minWeightB;
          }
          return weightA - weightB;
        });
      } else if (filter === "Peso" && order === "Descendente") {
        filteredDogs.sort((a, b) => {
          const weightA = parseInt(a.weight.split(" - ")[1]);
          const weightB = parseInt(b.weight.split(" - ")[1]);
          if (weightA === weightB) {
            // Si los pesos máximos son iguales, compara los pesos mínimos
            const minWeightA = parseInt(a.weight.split(" - ")[0]);
            const minWeightB = parseInt(b.weight.split(" - ")[0]);
            return minWeightB - minWeightA;
          }
          return weightB - weightA;
        });
      }

      return {
        ...state,
        dogs: filteredDogs,
      };
    }

    case SET_SOURCE: {
      const source = action.payload; // Obtenemos el valor de la fuente desde el payload

      // Filtrar los perros según la fuente seleccionada
      const filteredDogs = state.dogs.filter((dog) => {
        if (source === "Todos") {
          return true; // Mostrar todos los perros
        } else if (source === "Database") {
          return dog.database; // Mostrar solo los perros de la base de datos
        } else if (source === "Api") {
          return !dog.database; // Mostrar solo los perros de la API
        }
      });

      return {
        ...state,
        dogs: filteredDogs,
      };
    }

    case TEMPERAMENT_FILTER: {
      const selectedTemperaments = action.payload;

      //console.log("Temperamentos seleccionados:", selectedTemperaments);

      // Filtra los perros en función de los temperamentos seleccionados
      const filteredDogs = state.originalDogs.filter((dog) => {
        // Separa la cadena de temperamentos en un array
        const dogTemperaments = (dog.temperament || "")
          .split(",")
          .map((t) => t.trim());

        // Comprueba si todos los temperamentos seleccionados están en los temperamentos del perro
        return selectedTemperaments.every((selectedTemperament) =>
          dogTemperaments.includes(selectedTemperament)
        );
      });

      return {
        ...state,
        dogs: filteredDogs,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
