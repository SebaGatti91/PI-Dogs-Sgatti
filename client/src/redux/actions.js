import { SEARCH, GETDOGS, GETTEMP, SET_FILTER, SET_ORDER, SET_SOURCE, APPLY_FILTERS, TEMPERAMENT_FILTER } from "./action-types";
import axios from "axios";

export const searchDogs = (name) => {
  return async (dispatch) => { 
    try {
      // Realiza la búsqueda en función de name
      const response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      const data = response.data;
      return dispatch({
        type: SEARCH,
        payload: data,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
};


export const getAllDogs = () => {
  const endpoint = "http://localhost:3001/dogs";
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
  const endpoint = "http://localhost:3001/dogs";
  return async () => {
    try {
      const response = await axios.post(endpoint, dog);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw Error(error.message);
    }
  };
};

export const getTemperaments = () => {
  const endpoint = "http://localhost:3001/temperaments";
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
