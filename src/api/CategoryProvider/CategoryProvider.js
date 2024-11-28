import axios from "axios";
const URL = import.meta.env.VITE_URL;

export const getCategories = async () => {
  try {
    const response = await axios.get(`${URL}/categories`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      throw new Error("Sesión expirada, inicie sesión nuevamente");
    }
  }
};
