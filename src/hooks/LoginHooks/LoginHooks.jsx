import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../../api/loginProvider/loginProvider";

const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login({ username, passw: password });
      if (response.token) {
        console.log("Token set in cookie:", response.token);
        localStorage.setItem('token', response.token); 
        navigate('/dashboard'); // Use navigate instead of window.location
      } else {
        throw new Error('No se recibió token del servidor');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleSubmit
  };
};

export default useLogin;
