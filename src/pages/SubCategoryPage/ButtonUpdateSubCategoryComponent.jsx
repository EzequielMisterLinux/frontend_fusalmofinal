/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import tw from 'twin.macro';
import axios from 'axios';

const ModalBackground = tw.div`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center`;
const ModalContainer = tw.div`bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative`;
const CloseButton = tw.button`absolute top-2 right-2 text-gray-500 hover:text-gray-700`;
const FormGroup = tw.div`mb-4`;
const Label = tw.label`block text-gray-700 text-sm font-bold mb-2`;
const Input = tw.input`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none`;
const Select = tw.select`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none`;
const SubmitButton = tw.button`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none`;

const urlInventary = import.meta.env.VITE_URL;

const ButtonUpdateSubCategoryComponent = ({ subcategory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(subcategory.category._id);
  const [subcategoryName, setSubcategoryName] = useState(subcategory.subcategory);
  const [subcategoryDescription, setSubcategoryDescription] = useState(subcategory.description);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${urlInventary}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleUpdateSubcategory = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${urlInventary}/subcategories/${subcategory._id}`, {
        subcategory: subcategoryName,
        description: subcategoryDescription,
        categoryId: selectedCategoryId,
      });
      setIsModalOpen(false);
      window.location.reload(); // Refresh the page to show the updated subcategory
    } catch (error) {
      console.error('Error updating subcategory:', error);
    }
  };

  return (
    <>
      <button tw="bg-[#077F8C] text-white px-2 py-1 rounded mb-2 text-center w-24" onClick={() => setIsModalOpen(true)}>
        Actualizar
      </button>
      {isModalOpen && (
        <ModalBackground>
          <ModalContainer>
            <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
            <h2 tw="text-xl font-bold mb-4">Actualizar Subcategoría</h2>
            <form onSubmit={handleUpdateSubcategory}>
              <FormGroup>
                <Label>Seleccionar Categoría</Label>
                <Select
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Selecciona una categoría
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.category}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Nombre de la Subcategoría</Label>
                <Input
                  type="text"
                  value={subcategoryName}
                  onChange={(e) => setSubcategoryName(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Descripción de la Subcategoría</Label>
                <Input
                  type="text"
                  value={subcategoryDescription}
                  onChange={(e) => setSubcategoryDescription(e.target.value)}
                  required
                />
              </FormGroup>
              <SubmitButton type="submit">Actualizar Subcategoría</SubmitButton>
            </form>
          </ModalContainer>
        </ModalBackground>
      )}
    </>
  );
};

export default ButtonUpdateSubCategoryComponent;
