/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import tw from 'twin.macro';
import axios from 'axios';

const ModalBackground = tw.div`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center`;
const ModalContainer = tw.div`bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative`;
const CloseButton = tw.button`absolute top-2 right-2 text-gray-500 hover:text-gray-700`;
const FormGroup = tw.div`mb-4`;
const Label = tw.label`block text-gray-700 text-sm font-bold mb-2`;
const Input = tw.input`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none`;
const SubmitButton = tw.button`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none`;

const urlInventary = import.meta.env.VITE_URL;

const ButtonUpdateCategoryComponent = ({ category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState(category.category);
  const [categoryDescription, setCategoryDescription] = useState(category.description);

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${urlInventary}/categories/${category._id}`, {
        category: categoryName,
        description: categoryDescription,
      });
      setIsModalOpen(false);
      window.location.reload(); // Refresh the page to show the updated category
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <>
      <button tw="text-blue-500 hover:text-blue-700" onClick={() => setIsModalOpen(true)}>
        Actualizar
      </button>
      {isModalOpen && (
        <ModalBackground>
          <ModalContainer>
            <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
            <h2 tw="text-xl font-bold mb-4">Actualizar Categoría</h2>
            <form onSubmit={handleUpdateCategory}>
              <FormGroup>
                <Label>Nombre de la Categoría</Label>
                <Input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Descripción de la Categoría</Label>
                <Input
                  type="text"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  required
                />
              </FormGroup>
              <SubmitButton type="submit">Actualizar Categoría</SubmitButton>
            </form>
          </ModalContainer>
        </ModalBackground>
      )}
    </>
  );
};

export default ButtonUpdateCategoryComponent;
