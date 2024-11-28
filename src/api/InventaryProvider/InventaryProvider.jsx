import axios from "axios";

const urlInventary = import.meta.env.VITE_URL;

export const InventaryListProvider = async () => {
    try {
        const response = await axios.get(`${urlInventary}/inventories`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true 
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('Sesión expirada o no autorizada. Por favor, inicie sesión nuevamente.');
        }
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const UpdateInventory = async(id, data) => {
    try {
        const response = await axios.put(`${urlInventary}/inventories/${id}`, data, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('Sesión expirada o no autorizada. Por favor, inicie sesión nuevamente.');
        }
        throw new Error(error.response?.data?.message || error.message);
    }
}

export const CreateInventary = async (formData) => {
    try {
        const response = await axios.post(`${urlInventary}/inventories`, formData, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });

        return response.data;

    } catch (error) {
        if (error.response.status === 401) {
            throw new Error("Sesión expirada o no autorizada. Por favor inicie sesión nuevamente");
        }

        throw new Error(JSON.stringify(error.response?.data?.errors) || "Error al crear el inventario");
    }
};

export const GetInventory = async(id) => {
    try {
        const response = await axios.get(`${urlInventary}/inventories/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const DeleteInventory = async(id) => {
    try {
        const response = await axios.delete(`${urlInventary}/inventories/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const ProductsListProvider = async () => {
    try {
        const response = await axios.get(`${urlInventary}/products`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('Sesión expirada o no autorizada. Por favor, inicie sesión nuevamente.');
        }
        throw new Error(error.response?.data?.message || error.message);
    }
};
