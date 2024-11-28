import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import tw from "twin.macro";
import axios from "axios";
import updateUserById from "../../api/userupdate";

const URL = import.meta.env.VITE_URL;

const UpdateUserModal = ({ userId, onUpdate }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    middlename: "",
    phone: "",
    carnet: ""
  });

  useEffect(() => {
    // Lógica para cargar los datos del usuario por su ID
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${URL}/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserById(userId, userData); // Llama a la función para actualizar el usuario
      onUpdate(userData); // Actualiza el estado local si es necesario
      setModalIsOpen(false); // Cierra el modal después de la actualización
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  return (
    <Modal isOpen={modalIsOpen} ariaHideApp={false} style={customStyles}>
      <h2 tw="text-2xl font-bold mb-4">Actualizar Usuario</h2>
      <form onSubmit={handleSubmit} tw="space-y-4">
        <div tw="flex flex-col">
          <label htmlFor="name" tw="text-sm font-medium text-gray-600">Nombres:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
            tw="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div tw="flex flex-col">
          <label htmlFor="middlename" tw="text-sm font-medium text-gray-600">Apellidos:</label>
          <input
            type="text"
            id="middlename"
            name="middlename"
            value={userData.middlename}
            onChange={handleInputChange}
            required
            tw="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div tw="flex flex-col">
          <label htmlFor="phone" tw="text-sm font-medium text-gray-600">Teléfono:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            required
            tw="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div tw="flex flex-col">
          <label htmlFor="carnet" tw="text-sm font-medium text-gray-600">Carnet:</label>
          <input
            type="text"
            id="carnet"
            name="carnet"
            value={userData.carnet}
            onChange={handleInputChange}
            required
            tw="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button type="submit" tw="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Actualizar Usuario
        </button>
      </form>
    </Modal>
  );
};

export default UpdateUserModal;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "600px",
    width: "100%",
    padding: "20px",
    boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    border: "none",
  },
};
