import React, { useState } from 'react';
import tw from 'twin.macro';
import { FaUserAlt, FaLock, FaPhone, FaIdCard, FaEye, FaEyeSlash } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import axios from 'axios';
import Cookies from 'js-cookie';

const CreateUserModal = ({ setIsModalOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        middlename: '',
        mail: '',
        username: '',
        phone: '',
        carnet: '',
        passw: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await axios.post('http://localhost:3000/api/userregister', formData, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });

            if (response.data.token) {
                Cookies.set('token', response.data.token, { path: '/' });
                setSuccess('Usuario registrado exitosamente.');
                setFormData({
                    name: '',
                    middlename: '',
                    mail: '',
                    username: '',
                    phone: '',
                    carnet: '',
                    passw: ''
                });
            } else {
                throw new Error('No se recibió token del servidor');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div tw="fixed left-0 top-0 right-0 bottom-0 bg-[rgba(0, 0, 0, 0.8)] flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} tw="w-1/2 border-2 border-transparent rounded-md bg-white h-auto px-4 py-6">
                <h2 tw="text-center text-2xl mb-4">Registrar Usuario</h2>
                <div tw="w-full my-3 relative">
                    <input type="text" name="name" placeholder='Nombres' value={formData.name} onChange={handleChange} required tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3 pr-10" />
                    <FaUserAlt tw="absolute right-3 top-3 text-gray-400" />
                </div>
                <div tw="w-full my-3 relative">
                    <input type="text" name="middlename" placeholder='Apellidos' value={formData.middlename} onChange={handleChange} required tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3 pr-10" />
                    <FaUserAlt tw="absolute right-3 top-3 text-gray-400" />
                </div>
                <div tw="w-full my-3 relative">
                    <input type="email" name="mail" placeholder='Correo' value={formData.mail} onChange={handleChange} required tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3 pr-10" />
                    <FiMail tw="absolute right-3 top-3 text-gray-400" />
                </div>
                <div tw="w-full my-3 relative">
                    <input type="text" name="username" placeholder='Usuario' value={formData.username} onChange={handleChange} required tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3 pr-10" />
                    <FaUserAlt tw="absolute right-3 top-3 text-gray-400" />
                </div>
                <div tw="w-full my-3 relative">
                    <input type="tel" name="phone" placeholder='Teléfono' value={formData.phone} onChange={handleChange} required tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3 pr-10" />
                    <FaPhone tw="absolute right-3 top-3 text-gray-400" />
                </div>
                <div tw="w-full my-3 relative">
                    <input type="text" name="carnet" placeholder='Carnet' value={formData.carnet} onChange={handleChange} required tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3 pr-10" />
                    <FaIdCard tw="absolute right-3 top-3 text-gray-400" />
                </div>
                <div tw="w-full my-3 relative">
                    <input type={showPassword ? "text" : "password"} name="passw" placeholder='Contraseña' value={formData.passw} onChange={handleChange} required tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3 pr-10" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} tw="absolute right-10 top-3 text-gray-400">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <FaLock tw="absolute right-3 top-3 text-gray-400" />
                </div>
                {error && <p tw="text-red-500">{error}</p>}
                {success && <p tw="text-blue-500">{success}</p>}
                <div tw="w-full flex gap-4 mt-4">
                    <button type='submit' tw="w-full bg-[#042f40] text-white border-transparent text-sm rounded-md py-3 px-2">
                        Registrar
                    </button>
                    <button onClick={onClose} type='button' tw="w-full bg-[#0568a6] text-white border-transparent text-sm rounded-md py-3 px-2">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateUserModal;
