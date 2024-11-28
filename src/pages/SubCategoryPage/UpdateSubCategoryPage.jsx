/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import tw from 'twin.macro';
import axios from 'axios';
import ButtonUpdateSubCategoryComponent from './ButtonUpdateSubCategoryComponent';
import ButtonDeleteSubcategoryComponent from '../../components/ButtonDeleteSubcategoryComponent/ButtonDeleteSubcategoryComponent';

const PageContainer = tw.div`min-h-screen bg-gray-100 p-8`;
const PageTitle = tw.h1`text-4xl font-bold mb-6 text-center text-gray-900`;
const Table = tw.table`min-w-full bg-white border mt-4`;
const Thead = tw.thead``;
const Tbody = tw.tbody``;
const Tr = tw.tr``;
const Th = tw.th`py-2 px-4 border-b bg-gray-100 text-center text-gray-600 font-bold`;
const Td = tw.td`py-2 px-4 border text-left text-gray-700`;

const ModalBackground = tw.div`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center`;
const ModalContainer = tw.div`bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative`;
const CloseButton = tw.button`absolute top-2 right-2 text-gray-500 hover:text-gray-700`;
const FormGroup = tw.div`mb-4`;
const Label = tw.label`block text-gray-700 text-sm font-bold mb-2`;
const Input = tw.input`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none`;
const Select = tw.select`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none`;
const SubmitButton = tw.button`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none`;

const urlInventary = import.meta.env.VITE_URL;

const SubCategoryPage = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');
  const [subcategoryDescription, setSubcategoryDescription] = useState('');

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(`${urlInventary}/subcategories`);
      setSubcategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${urlInventary}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, []);

  const handleCreateSubcategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${urlInventary}/subcategories`, {
        subcategory: subcategoryName,
        description: subcategoryDescription,
        categoryId: selectedCategoryId,
      });
      setIsModalOpen(false);
      setSelectedCategoryId('');
      setSubcategoryName('');
      setSubcategoryDescription('');
      fetchSubcategories();
    } catch (error) {
      console.error('Error creating subcategory:', error);
    }
  };

  const handleDeleteSubcategory = async (subcategoryId) => {
    try {
      const response = await axios.delete(`${urlInventary}/subcategories/${subcategoryId}`);
      console.log(response.data); // Optional: Log success message
      fetchSubcategories(); // Refresh subcategories after deletion
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      // Optionally handle specific error messages or show notifications
    }
  };

  return (
    <PageContainer>
      <PageTitle>Gestión de Subcategorías</PageTitle>
      <button
        tw="mb-4 bg-[#0568a6] text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsModalOpen(true)}
      >
      Agregar Subcategoría
      </button>
      <Table>
        <Thead>
          <Tr>
            <Th>Categoría</Th>
            <Th>Nombre</Th>
            <Th>Descripción</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        
        <Tbody>
          {subcategories.map((subcategory) => (
            <Tr key={subcategory._id}>
              <Td>{subcategory.category.category}</Td>
              <Td>{subcategory.subcategory}</Td>
              <Td>{subcategory.description}</Td>
              <Td>
                <ButtonUpdateSubCategoryComponent subcategory={subcategory} />
                <ButtonDeleteSubcategoryComponent
                  subcategoryId={subcategory._id}
                  onDelete={handleDeleteSubcategory}
                />
              </Td>
              
            </Tr>
          ))}
        </Tbody>
      </Table>
      {isModalOpen && (
        <ModalBackground>
          <ModalContainer>
            <CloseButton tw="bg-[#077F8C] text-white px-2 py-1 rounded mb-2 w-full inline-block text-center" onClick={() => setIsModalOpen(false)}>×</CloseButton>
            <h2 tw="text-xl font-bold mb-4">Crear Subcategoría</h2>
            <form onSubmit={handleCreateSubcategory}>
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
              <SubmitButton type="submit">Crear Subcategoría</SubmitButton>
            </form>
          </ModalContainer>
        </ModalBackground>
      )}
    </PageContainer>
  );
};

export default SubCategoryPage;
