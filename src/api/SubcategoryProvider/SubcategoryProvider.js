import axios from "axios";
const URL = import.meta.env.VITE_URL;

export const getCategoryWithSubcategories = async (id) => {
  try {
    const response = await axios.get(`${URL}/categories/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 401) {
      throw new Error(
        "Sesión expirada o no autorizada. Por favor, inicie sesión nuevamente."
      );
    }
  }
};
