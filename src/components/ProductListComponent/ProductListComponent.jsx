/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import tw from 'twin.macro';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useProductList from '../../hooks/ProductListHook/ProductListHook';
import { CreateProductModal } from '../ModalProduct/CreateProductModal';
import ButtonDeleteProductComponent from '../ButtonDeleteProductComponent/ButtonDeleteProductComponent';
import { generarReporte } from '../../api/GenerateReportProvider/GenerateReportProvider';

const Container = tw.div`min-h-screen bg-gray-100 p-8`;
const PageTitle = tw.h1`text-4xl font-bold mb-6 text-center text-gray-900`;
const Table = tw.table`min-w-full bg-white border-collapse border mt-4`;
const Thead = tw.thead`bg-gray-200`;
const Tbody = tw.tbody``;
const Tr = tw.tr``;
const Th = tw.th`py-2 px-4 border text-center text-gray-700 font-bold`;
const Td = tw.td`py-2 px-4 border text-left text-gray-700`;

const ModalBackground = tw.div`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center`;
const ModalContainer = tw.div`bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative`;
const CloseButton = tw.button`absolute top-2 right-2 text-gray-500 hover:text-gray-700`;
const FormGroup = tw.div`mb-4`;
const Label = tw.label`block text-gray-700 text-sm font-bold mb-2`;
const Input = tw.input`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none`;
const SubmitButton = tw.button`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none`;

const urlReport = import.meta.env.VITE_URL;

const ProductListComponent = () => {
  const {
    Products,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    handleSearch,
    setIsModelOpen,
    closeModal,
    openModal,
    isModelOpen,
    setProducts,
  } = useProductList();
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroSubcategoria, setFiltroSubcategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  useEffect(() => {
    // Obtener categorías y subcategorías del backend
    const fetchCategorias = async () => {
      try {
        const { data } = await axios.get(`${urlReport}/categories`); // Ajusta la ruta según tu configuración
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    const fetchSubcategorias = async () => {
      try {
        const { data } = await axios.get(`${urlReport}/subcategories`); // Ajusta la ruta según tu configuración
        setSubcategorias(data);
      } catch (error) {
        console.error('Error al obtener las subcategorías:', error);
      }
    };

    fetchCategorias();
    fetchSubcategorias();
  }, []);

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) => prevProducts.filter(product => product._id !== productId));
  };

  const handleGenerarReporte = async () => {
    try {
      await generarReporte({ categoria: filtroCategoria, subcategoria: filtroSubcategoria });
    } catch (error) {
      console.error('Error al generar el reporte:', error);
    }
  };

  if (loading) return <div tw="text-center mt-4">Cargando...</div>;
  if (error) return <div tw="text-center mt-4 text-red-500">Error: {error}</div>;

  return (
    <Container>
      <PageTitle>Lista de Productos</PageTitle>
      <button
        onClick={openModal}
        tw="mb-4 bg-[#0568a6] text-white font-bold py-2 px-4 rounded"
      >
        Agregar producto
      </button>
      {isModelOpen && <CreateProductModal setIsModelOpen={setIsModelOpen} onClose={closeModal} setProducts={setProducts} />}
      <div tw="flex items-center mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          tw="border rounded px-4 py-2 flex-grow"
        />
        <button
          onClick={() => handleSearch(searchTerm)}
          tw="bg-[#0568a6] text-white px-4 py-2 rounded-r hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>
      <div tw="flex items-center mb-4">
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          tw="border rounded px-4 py-2 mr-2"
        >
          <option value="">Seleccionar Categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria._id} value={categoria._id}>{categoria.category}</option>
          ))}
        </select>
        <select
          value={filtroSubcategoria}
          onChange={(e) => setFiltroSubcategoria(e.target.value)}
          tw="border rounded px-4 py-2 mr-2"
        >
          <option value="">Seleccionar Subcategoría</option>
          {subcategorias.map((subcategoria) => (
            <option key={subcategoria._id} value={subcategoria._id}>{subcategoria.subcategory}</option>
          ))}
        </select>
        <button
          onClick={handleGenerarReporte}
          tw="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generar Reporte
        </button>
      </div>
      <Table>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Descripción</Th>
            <Th>Marca</Th>
            <Th>Precio</Th>
            <Th>Imagen</Th>
            <Th>Categoría</Th>
            <Th>Subcategoría</Th>
            <Th>Estado</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Products.map((product) => (
            <Tr key={product._id}>
              <Td>{product.name}</Td>
              <Td>{product.description}</Td>
              <Td>{product.brand}</Td>
              <Td>${product.price}</Td>
              <Td>
                <img src={`https://backendfusalmofinal-production.up.railway.app${product.image}`} alt={product.name} tw="w-36 h-16 object-cover" />
                <button 
                  tw="bg-[#077F8C] text-white px-2 py-1 rounded mt-2 w-full"
                  onClick={() => openImageModal(`https://backendfusalmofinal-production.up.railway.app${product.image}`)}
                >
                  Ver
                </button>
              </Td>
              <Td>{product.categoryId?.category}</Td>
              <Td>{product.subCategoryId?.subcategory}</Td>
              <Td>
                <span tw="bg-[#0568a6] text-white rounded-md px-2 py-1 text-xs">
                  {product.status}
                </span>
              </Td>
              <Td>
                <Link to={`/dashboard/update/${product._id}`} tw="bg-[#077F8C] text-white px-2 py-1 rounded mb-2 w-full inline-block text-center">
                  Actualizar
                </Link>
                <ButtonDeleteProductComponent productId={product._id} onDelete={() => handleDeleteProduct(product._id)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {selectedImage && (
        <div tw="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div tw="bg-white p-4 rounded shadow-lg max-w-lg w-full">
            <img src={selectedImage} alt="Product" tw="w-full h-auto" />
            <button 
              tw="bg-red-500 text-white px-4 py-2 rounded mt-4"
              onClick={closeImageModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProductListComponent;
