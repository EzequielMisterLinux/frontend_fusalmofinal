// src/hooks/ForgotPasswordHooks.js
import { useState } from "react";
import forgotAccount from "../../api/ForgotPasswordProvider/ForgotPasswordProvider";

const useForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await forgotAccount(email);
      setMessage(response.message);
      setError("");
    } catch (err) {
      setError("Error al enviar el correo. Por favor, inténtalo de nuevo.");
      setMessage("");
    }
  };

  return {
    email,
    setEmail,
    message,
    error,
    handleForgotPassword,
  };
};

export default useForgotPassword;
