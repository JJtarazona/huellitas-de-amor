import axios from "axios";

export const GET_PET_BY_ID = "GET_PET_BY_ID";
export const GET_PET_BY_NAME = "GET_PET_BY_NAME";
export const GET_MASCOTAS = "GET_MASCOTAS";
export const APPLY_FILTERS = "APPLY_FILTERS";
export const FILTERS_ERROR = "FILTERS_ERROR";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const ORDER_BY_AGE = "ORDER_BY_AGE";
export const FETCHING_MASCOTAS = "FETCHING_MASCOTAS";

const ENDPOINT = "http://localhost:3001/mascotas/";

const ENDPOINT_FILTER = "http://localhost:3001/mascotas/filtro";
//const ENDPOINTNAME = "http://localhost:3001/mascotas?name=";
const ENDPOINTNAME2 = "http://localhost:3001/mascotas/nombre?nombre=";


///Get de mascotas por id
export const getPetById = (id) => async (dispatch) => {
  try {
    //En data guardo los datos de las mascota que coincida con id
    const { data } = await axios.get(ENDPOINT + `${id}`);
    dispatch({ type: GET_PET_BY_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//Guardo todas las mascotas
export const getMascotas = () => async (dispatch) => {
  try {
    const response = await axios.get(ENDPOINT);
   dispatch({type: FETCHING_MASCOTAS, payload: response.data});
  } catch (error) {
    console.log(error);
  }
};

//Busco las mascotas por la query que recibo
export const getPetByName = (nombre) => async (dispatch) => {
  try {
    const { data } = await axios.get(ENDPOINTNAME2 + nombre);
    dispatch({ type: GET_PET_BY_NAME, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//Filtros para las mascotas
export const applyFilters = (filters) => {
  return (dispatch, getState) => {
    // const BACKEND_URL = "http://localhost:3001";
    axios
			.get(`${ENDPOINT_FILTER}`, { params: filters })
			.then((response) => {
				dispatch({
					type: APPLY_FILTERS,
					payload: response.data,
				});
			})
			.catch((error) => {
				console.error(error);
			});
  };
};

//Ordena las mascotas Ascendentemente o desdcendemntemnte
export const orderByWeight = (order) => (dispatch) => {
  if (order === "defecto") {
    return dispatch(getMascotas());
  }
  return dispatch({ type: ORDER_BY_WEIGHT, payload: order });
};

//Ordena las mascotas segun la edad, de menor a mayor o veceversa
export const orderByAge = (order) => (dispatch) => {
  if (order === "defecto") {
    return dispatch(getMascotas());
  }
  return dispatch({ type: ORDER_BY_AGE, payload: order });
};

//Agrega una nueva mascota
export const addMascota = (Mascota) => {
  return async () => {
    try {
      const response = await axios.post(`${ENDPOINT}/`, Mascota);
      return alert("Mascota creada con éxito.")
        
    } catch (error) {
      console.log(error);
    }
  };
};
