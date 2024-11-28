import React from "react";
import tw from "twin.macro";
import axios from "axios";

const urldeleteProduct = import.meta.env.VITE_URL;


const ButtonDeleteProductComponent = ({ productId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${urldeleteProduct}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      });
      onDelete(productId); 
    } catch (error) {
      console.error("Error eliminando el producto:", error);
    }
  };

  return (
    <button
      tw="bg-[#065473] text-white px-2 py-1 rounded w-full"
      onClick={handleDelete}
    >
      Eliminar
    </button>
  );
};

export default ButtonDeleteProductComponent;
