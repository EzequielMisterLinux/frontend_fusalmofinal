/** @jsxImportSource @emotion/react */
import React, { useState, useCallback } from "react";
import tw from "twin.macro";
import useEmployeList from "../../hooks/EmployeListHooks/EmployeListHook";
import ButtonDeleteEmployeeComponent from "../ButtonDeleteEmployeeComponent/ButtonDeleteEmployeeComponent";
import UpdateUserModal from "./ModalUpdateUser"; 

const Container = tw.div`container mx-auto p-6 bg-white shadow-lg rounded-lg`;
const Title = tw.h2`text-2xl font-bold mb-6 text-gray-800`;
const Input = tw.input`border border-gray-300 rounded-l px-4 py-2 flex-grow focus:outline-none focus:border-blue-500`;
const SearchButton = tw.button`bg-[#0568a6] text-white px-4 py-2 rounded-r hover:bg-blue-700`;
const Table = tw.table`table-auto w-full border-collapse border border-gray-200`;
const Th = tw.th`border px-4 py-2 text-center text-gray-600 font-medium`;
const Td = tw.td`py-2 px-4 border text-left text-gray-700`;
const UpdateButton = tw.button`bg-[#077F8C] text-white px-2 py-1 rounded mb-2 text-center w-24`;

const EmployeListComponent = () => {
  const { employees, loading, error, searchTerm, setSearchTerm, handleSearch, setEmployees } = useEmployeList();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleDeleteEmployee = useCallback(async (employeeId) => {
    try {
      // Lógica para eliminar empleado
      setEmployees((prevEmployees) => prevEmployees.filter(employee => employee._id !== employeeId));
    } catch (error) {
      console.error("Error eliminando el empleado:", error);
    }
  }, [setEmployees]);

  const handleUpdateClick = useCallback((userId) => {
    setSelectedUserId(userId);
  }, []);

  if (loading) return <div tw="text-center mt-4">Cargando...</div>;
  if (error) return <div tw="text-center mt-4 text-red-500">Error: {error}</div>;

  return (
    <Container>
      <Title>Lista de Empleados</Title>
      <div tw="flex items-center mb-6">
        <Input
          type="text"
          placeholder="Buscar por carnet"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
        />
        <SearchButton onClick={() => handleSearch(searchTerm)}>Buscar</SearchButton>
      </div>
      <Table>
        <thead>
          <tr tw="bg-gray-100">
            <Th>Nombres</Th>
            <Th>Apellidos</Th>
            <Th>Teléfono</Th>
            <Th>Carnet</Th>
            <Th tw="text-center">Acciones</Th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id} tw="hover:bg-gray-50">
              <Td>{employee.name}</Td>
              <Td>{employee.middlename}</Td>
              <Td>{employee.phone}</Td>
              <Td>{employee.carnet}</Td>
              <Td tw="text-center">
                <div tw="flex flex-col items-center space-y-2">
                  <UpdateButton onClick={() => handleUpdateClick(employee._id)}>
                    Actualizar
                  </UpdateButton>
                  {selectedUserId === employee._id && (
                    <UpdateUserModal
                      key={employee._id}
                      userId={employee._id}
                      onUpdate={(updatedUserData) => {
                        setSelectedUserId(null);
                      }}
                    />
                  )}
                  <ButtonDeleteEmployeeComponent employeeId={employee._id} onDelete={handleDeleteEmployee} />
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default EmployeListComponent;
