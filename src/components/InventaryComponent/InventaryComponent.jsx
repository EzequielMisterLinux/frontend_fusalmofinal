/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import tw from 'twin.macro';
import useInventary from '../../hooks/InventaryHooks/InventaryHooks';

const Container = tw.div`container mx-auto p-4`;
const ModalBackground = tw.div`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center`;
const ModalContainer = tw.div`bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative`;
const CloseButton = tw.button`absolute top-2 right-2 text-gray-500 hover:text-gray-700`;
const Title = tw.h1`text-3xl font-bold mb-6 text-gray-800`;
const ErrorMessage = tw.p`text-red-500 mb-4`;
const InputGroup = tw.div`mb-4`;
const Label = tw.label`block text-gray-700 text-sm font-bold mb-2`;
const Input = tw.input`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500`;
const Select = tw.select`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500`;
const ErrorText = tw.p`text-red-500 text-xs italic`;
const Button = tw.button`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`;
const Table = tw.table`min-w-full bg-white border border-collapse mt-4`;
const Th = tw.th`py-2 px-4 border-b border-gray-300 bg-gray-100 text-center text-gray-600 font-bold`;
const Td = tw.td`py-2 px-4 border text-left text-gray-700`;

const InventaryComponent = () => {
  const { inventories, products, createInventary, validationErrors, updateInventory, getInventory, deleteInventory } = useInventary();
  const [formData, setFormData] = useState({
    stock: '',
    productId: '',
    unitPrice: '',
  });

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isInventoryId, setIsInventoryId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isInventoryId) {
      try {
        await handleUpdate(e, isInventoryId);
        setIsInventoryId(null);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await createInventary(formData);
        setIsModelOpen(false);
        setFormData({ stock: '', productId: '', unitPrice: '' });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      await updateInventory(id, formData);
      setIsModelOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetInventory = async (e, id) => {
    e.preventDefault();
    setIsModelOpen(true);
    setIsInventoryId(id);
    try {
      const inventory = await getInventory(id);
      setFormData({ productId: inventory.productId._id, stock: inventory.stock, unitPrice: inventory.unitPrice });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteInventory = async (e, id) => {
    e.preventDefault();
    try {
      const response = await deleteInventory(id);
      alert(response);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setIsModelOpen(false);
    setFormData({ productId: '', stock: '', unitPrice: '' });
  };

  return (
    <Container>
      <Title>Inventario</Title>
      <button
        tw="mb-4 bg-[#0568a6] text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsModelOpen(true)}
      >
        Agregar inventario
      </button>
      {isModelOpen && (
        <ModalBackground>
          <ModalContainer>
            <CloseButton onClick={closeModal}>×</CloseButton>
            <form onSubmit={handleSubmit}>
              <InputGroup>
                <Label htmlFor="stock">Stock</Label>
                <Input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Stock"
                  id="stock"
                />
                {validationErrors.stock && <ErrorText>{validationErrors.stock}</ErrorText>}
              </InputGroup>
              <InputGroup>
                <Label htmlFor="productId">Producto</Label>
                <Select
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  id="productId"
                >
                  <option value="">Seleccionar Producto</option>
                  {products?.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </Select>
                {validationErrors.productId && <ErrorText>{validationErrors.productId}</ErrorText>}
              </InputGroup>
              <InputGroup>
                <Label htmlFor="unitPrice">Precio Unitario</Label>
                <Input
                  type="number"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleChange}
                  placeholder="Unit Price"
                  id="unitPrice"
                />
                {validationErrors.unitPrice && <ErrorText>{validationErrors.unitPrice}</ErrorText>}
              </InputGroup>
              <Button type="submit">
                {isInventoryId ? 'Actualizar inventario' : 'Crear Inventario'}
              </Button>
            </form>
          </ModalContainer>
        </ModalBackground>
      )}

      <Table>
        <thead>
          <tr>
            <Th>Código</Th>
            <Th>Producto</Th>
            <Th>Stock</Th>
            <Th>Precio Unitario</Th>
            <Th>Acciones</Th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((inventory) => (
            <tr key={inventory._id}>
              <Td>{inventory.code}</Td>
              <Td>{inventory?.productId?.name}</Td>
              <Td>{inventory.stock}</Td>
              <Td>{inventory.unitPrice}</Td>
              <Td>
                <button
                  tw="bg-[#077F8C] text-white px-2 py-1 rounded mb-2 text-center w-24"
                  onClick={(e) => handleGetInventory(e, inventory._id)}
                >
                  Actualizar
                </button>
                <button
                  tw="bg-[#065473] w-24 ml-2 text-white px-2 py-1 rounded"
                  onClick={(e) => handleDeleteInventory(e, inventory._id)}
                >
                  Eliminar
                </button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default InventaryComponent;
