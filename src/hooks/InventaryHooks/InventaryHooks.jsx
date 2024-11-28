import { useState, useEffect } from 'react';
import { InventaryListProvider, CreateInventary, ProductsListProvider, UpdateInventory, GetInventory, DeleteInventory } from "../../api/InventaryProvider/InventaryProvider";

const useInventary = () => {
  const [inventories, setInventories] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const data = await InventaryListProvider();
        setInventories(data);
      } catch (error) {
        setError(error.message);
      }
    };

    
    fetchInventories();
    fetchProducts();
  }, []);
  
  const fetchProducts = async () => {
    try {
      const data = await ProductsListProvider();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const createInventary = async (formData) => {
    try {
      const newInventary = await CreateInventary(formData);
      setInventories([...inventories, newInventary]);
      setValidationErrors({});
    } catch (error) {
      setError(error.message);
      if (error.message.includes("Invalid value")) {
        try {
          const parsedErrors = JSON.parse(error.message);
          const errors = parsedErrors.reduce((acc, err) => {
            acc[err.path] = err.msg;
            return acc;
          }, {});
          setValidationErrors(errors);
        } catch (parseError) {
          console.error('Error parsing validation errors:', parseError);
        }
      }
    }
  };

  const updateInventory = async(id, data) => {
    try {
      const inventoryToUpdate = inventories.filter((inventory) => inventory._id !== id);
      const inventoryUpdated = await UpdateInventory(id, data);
      setInventories([...inventoryToUpdate, inventoryUpdated]);
      setValidationErrors({});
    } catch (error) {
      if (error.message.includes("Invalid value")) {
          const parsedErrors = JSON.parse(error.message);
          const errors = parsedErrors.reduce((acc, err) => {
            acc[err.path] = err.msg;
            return acc;
          }, {});
          setValidationErrors(errors);
        }
        console.error('Error parsing validation errors:');
      }
    }

    const getInventory = async (id) => {
      try {
        const inventory = await GetInventory(id);
        await fetchProducts();
        return inventory;
      } catch (error) {
        console.log(error);
      }
    }

    const deleteInventory = async(id) => {
      try {
        const response = await DeleteInventory(id);
        const newInventoryState = inventories.filter((inventory) => inventory._id !== id);
        setInventories(newInventoryState);
        return response.message;
      } catch (error) {
        console.log(error);
      }
    }

  return { inventories, products, createInventary, error, validationErrors, updateInventory, getInventory, deleteInventory };
};

export default useInventary;
