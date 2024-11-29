import "./LoginRegister.css";
import { FaUserAlt, FaLock, FaPhone } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { useState } from 'react';
import axios from 'axios';

const urlogin = import.meta.env.VITE_URL;

const LoginRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        middlename: '',
        mail: '',
        username: '',
        phone: '',
        carnet: '',
        passw: ''
    });

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
            const response = await axios.post(`${urlogin}/userregister`, formData);

            if (response.status === 200) {
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
                throw new Error('Error en el registro del usuario');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error al registrar el usuario');
        }
    };

    return (
        <div className="bodyRegister">
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Registrar Usuario</h1>
                    <div className='input-box'>
                        <input type="text" name="name" placeholder='Nombres' value={formData.name} onChange={handleChange} required />
                        <FaUserAlt className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type="text" name="middlename" placeholder='Apellidos' value={formData.middlename} onChange={handleChange} required />
                        <FaUserAlt className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type="email" name="mail" placeholder='Correo' value={formData.mail} onChange={handleChange} required />
                        <FiMail className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type="text" name="username" placeholder='Usuario' value={formData.username} onChange={handleChange} required />
                        <FaUserAlt className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type="tel" name="phone" placeholder='Telefono' value={formData.phone} onChange={handleChange} required />
                        <FaPhone className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type="text" name="carnet" placeholder='Carnet' value={formData.carnet} onChange={handleChange} required />
                    </div>
                    <div className='input-box'>
                        <input type="password" name="passw" placeholder='Contraseña' value={formData.passw} onChange={handleChange} required />
                        <FaLock className='icon' />
                    </div>
                    <button type='submit'>Registrar</button>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                </form>
            </div>
        </div>
    );
};

export default LoginRegister;
