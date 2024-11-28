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


const CategoryComponent = ({ onCategoryCreated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');
  const [subcategoryDescription, setSubcategoryDescription] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${urlInventary}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${urlInventary}/categories`, {
        category: categoryName,
        description: categoryDescription,
      });
      setCategoryName('');
      setCategoryDescription('');
      const response = await axios.get(`${urlInventary}/categories`);
      setCategories(response.data);
      onCategoryCreated();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleSubcategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${urlInventary}/subcategories`, {
        subcategory: subcategoryName,
        description: subcategoryDescription,
        categoryId: selectedCategoryId,
      });
      setSubcategoryName('');
      setSubcategoryDescription('');
      setSelectedCategoryId('');
      onCategoryCreated();
    } catch (error) {
      console.error('Error creating subcategory:', error);
    }
  };

  return (
    <>
      <button
        tw="mb-4 bg-[#0568a6] text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Agregar Categoría y Subcategoría
      </button>
      {isModalOpen && (
        <ModalBackground>
          <ModalContainer>
            <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
            <h2 tw="text-xl font-bold mb-4">Agregar Categoría y Subcategoría</h2>
            <form onSubmit={handleCategorySubmit}>
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
              <SubmitButton type="submit">Agregar Categoría</SubmitButton>
            </form>
            <form onSubmit={handleSubcategorySubmit} tw="mt-6">
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
              <SubmitButton type="submit" >Agregar Subcategoría</SubmitButton>
            </form>
          </ModalContainer>
        </ModalBackground>
      )}
    </>
  );
};

export default CategoryComponent;
