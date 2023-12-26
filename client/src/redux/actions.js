import { SEARCH, GETDOGS, GET_DOG_ID, GETTEMP, SET_FILTER, SET_ORDER, SET_SOURCE, APPLY_FILTERS, TEMPERAMENT_FILTER, CLEAR_DETAIL } from "./action-types";
import axios from "axios";

export const searchDogs = (name) => {
  return async (dispatch) => { 
    try {
      // Realiza la búsqueda en función de name
      const response = await axios.get(`https://pi-dogs-sgatti-production.up.railway.app/dogs?name=${name}`);
      if (response.status === 200) {
        const data = response.data;
        dispatch({
          type:SEARCH,
          payload: data,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        
        alert("No se encuentra esa raza de perro.");
      } else {
      throw Error(error.message);
     }
    }
  };
};

export const getAllDogs = () => {
  const endpoint = "https://pi-dogs-sgatti-production.up.railway.app/dogs";
  return async (dispatch) => {
    try {
      const response = await axios.get(endpoint);
      if (response.status === 200) {
        const data = response.data;
        dispatch({
          type: GETDOGS,
          payload: data,
        });
      }
    } catch (error) {
      throw Error(error.message);
    }
  };
};

export const PostDog = (dog) => {
  const endpoint = "https://pi-dogs-sgatti-production.up.railway.app/dogs";
  return async () => {
    try {
      const response = await axios.post(endpoint, dog);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        
        alert("Esa raza ya existe perro no creado");
      } else {
      throw Error(error.message);
     }
    }
  };
};

export const getDog = (id) => {
  return async (dispatch) => { 
    try {
      // Realiza la búsqueda en función de name
      const response = await axios.get(`https://pi-dogs-sgatti-production.up.railway.app/dogs/${id}`);
      if (response.status === 200) {
        const data = response.data;
        dispatch({
          type:GET_DOG_ID,
          payload: data,
        });
      }
    } catch (error) {
      throw Error(error.message);
    }
  };
};


export const getTemperaments = () => {
  const endpoint = "https://pi-dogs-sgatti-production.up.railway.app/temperaments";
  return async (dispatch) => {
    try {
      const response = await axios.get(endpoint);
      if (response.status === 200) {
        const data = response.data;
        dispatch({
          type: GETTEMP,
          payload: data,
        });
      }
    } catch (error) {
      throw Error(error.message);
    }
  };
};

//---------------Filtrados------------------------

export const setOrder = (order) => {
  return {
    type: SET_ORDER,
    payload: order,
  };
};

export const setSource = (source) => {
  return {
    type: SET_SOURCE,
    payload: source,
  };
};

export const setFilter = (filter) => {
  return {
    type: SET_FILTER,
    payload: filter,
  };
};


export const applyFilters = () => {
  return {
    type: APPLY_FILTERS, //Manda a ejecutar los filtros
  };
};

export const temperamentFilter = (temperaments) => {
  return {
    type: TEMPERAMENT_FILTER,
    payload: temperaments,
  };
};

export const clearDetail = () => {
  return {
    type: CLEAR_DETAIL,
    payload:{}
  }
}