import React, { useState } from 'react';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';
import EmployeListComponent from "../../components/EmployeListComponent/EmployeListComponent";
import CreateUserModal from "../../components/ModalUser/CreateUserModal";

const EmployeListPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div tw="container mx-auto p-4">
            <div tw="flex justify-between mb-4">
                <h2 tw="text-xl font-semibold mb-4">Lista de Empleados</h2>
                <button onClick={openModal} tw="px-2 py-1 rounded-md bg-[#0568a6] text-white">Agregar Usuario</button>
            </div>
            {isModalOpen && <CreateUserModal setIsModalOpen={setIsModalOpen} onClose={closeModal} />}
            <EmployeListComponent />
        </div>
    );
};

export default EmployeListPage;
