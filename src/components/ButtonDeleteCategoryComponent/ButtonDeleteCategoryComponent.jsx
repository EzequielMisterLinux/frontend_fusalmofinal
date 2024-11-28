import React from "react";
import tw from "twin.macro";
import axios from "axios";

const urldeleteCategory = import.meta.env.VITE_URL;

const ButtonDeleteCategoryComponent = ({ categoryId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${urldeleteCategory}/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await onDelete(categoryId);
    } catch (error) {
      console.error("Error eliminando la categoría:", error);
    }
  };

  return (
    <button
      tw="bg-[#065473] w-24 ml-2 text-white px-2 py-1 rounded"
      onClick={handleDelete}
    >
      Eliminar
    </button>
  );
};

export default ButtonDeleteCategoryComponent;
