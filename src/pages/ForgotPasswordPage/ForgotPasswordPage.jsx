// src/pages/ForgotPasswordPage/ForgotPasswordPage.jsx
import React from "react";
import useForgotPassword from "../../hooks/ForgotPasswordHooks/ForgotPasswordHooks";
import ForgotPasswordComponent from "../../components/forgotPasswordComponent/ForgotPasswordComponent";

const ForgotPasswordPage = () => {
  const { email, setEmail, message, error, handleForgotPassword } = useForgotPassword();

  return (
    <ForgotPasswordComponent
      email={email}
      setEmail={setEmail}
      message={message}
      error={error}
      handleForgotPassword={handleForgotPassword}
    />
  );
};

export default ForgotPasswordPage;
