import axios from 'axios';

const URL = import.meta.env.VITE_URL;

const updateUserById = async (userId, userData) => {
  try {
    const response = await axios.put(`${URL}/users/${userId}`, userData);
    return response.data; // Devuelve los datos actualizados si es necesario
  } catch (error) {
    throw new Error(error.message); // Lanza un error si falla la solicitud
  }
};

export default updateUserById;
