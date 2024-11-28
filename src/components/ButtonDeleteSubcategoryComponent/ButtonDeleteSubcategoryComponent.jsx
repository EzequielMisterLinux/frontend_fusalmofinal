import React from "react";
import tw from "twin.macro";
import axios from "axios";

const urldeleteSubcategory = import.meta.env.VITE_URL;

const ButtonDeleteSubcategoryComponent = ({ subcategoryId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${urldeleteSubcategory}/subcategories/${subcategoryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await onDelete(subcategoryId);
    } catch (error) {
      console.error("Error eliminando la subcategoría:", error);
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

export default ButtonDeleteSubcategoryComponent;
