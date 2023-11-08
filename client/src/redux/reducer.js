import {
  SEARCH,
  GETDOGS,
  GETTEMP,
  GET_DOG_ID,
  SET_FILTER,
  SET_ORDER,
  SET_SOURCE,
  APPLY_FILTERS,
  TEMPERAMENT_FILTER,
  CLEAR_DETAIL,
} from "./action-types";

const initialState = {
  dogs: [],
  dogs_search: [],
  temperaments: [],
  originalDogs: [],
  dogs_source: [],
  filter: "Raza", // Valor predeterminado por nombre
  order: "Ascendente", // Valor predeterminado por nombre
  dog_id: {},
 
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GETDOGS:
      return {
        ...state,
        originalDogs: action.payload,
        dogs_search: action.payload,
        dogs_source: action.payload, 
        dogs: action.payload, // perros filtrados que renderizo
      };

    case GET_DOG_ID:
      return {
        ...state,
        dog_id: action.payload,
      };

      case CLEAR_DETAIL: {
        return {
          ...state,
          dog_id: action.payload,
        };
      }

    case SEARCH:
      return {
        ...state,
        dogs: action.payload, 
        dogs_search: action.payload, 
        dogs_source: action.payload,
      };

    case GETTEMP:
      return {
        ...state,
        temperaments: action.payload, 
      };

    case SET_FILTER: {
      return {
        ...state,
        filter: action.payload, 
      };
    }

    case SET_ORDER: {
      return {
        ...state,
        order: action.payload, 
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

       // Filtra los perros en función de los temperamentos seleccionados
       let filteredDogs = [];


      // Filtrar los perros según la fuente seleccionada
      filteredDogs = state.dogs_search.filter((dog) => {
        // Verifica si dog.temperament existe y no es nulo o indefinido
        if (dog) {
        if (source === "Todos") {
          return true; // Mostrar todos los perros
        } else if (source === "Database") {
          return dog.database; // Mostrar solo los perros de la base de datos
        } else if (source === "Api") {
          return !dog.database; // Mostrar solo los perros de la API
        }
       }
      });

      return {
        ...state,
        dogs: filteredDogs,
        dogs_source: filteredDogs
      };
    }

    case TEMPERAMENT_FILTER: {
      const selectedTemperaments = action.payload;

      // Filtra los perros en función de los temperamentos seleccionados
      let filteredDogs = [];

    
        filteredDogs = state.dogs_source.filter((dog) => {
          // Verifica si dog.temperament existe y no es nulo o indefinido
          if (dog && dog.temperament) {
            // Separa la cadena de temperamentos en un array
            const dogTemperaments = dog.temperament
              .split(",")
              .map((t) => t.trim());

            // Comprueba si todos los temperamentos seleccionados están en los temperamentos del perro
            return selectedTemperaments.every((selectedTemperament) =>
              dogTemperaments.includes(selectedTemperament)
            );
          }
         
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
