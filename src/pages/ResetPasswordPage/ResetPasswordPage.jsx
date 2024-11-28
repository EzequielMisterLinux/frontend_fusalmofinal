import React from "react";
import { useParams } from "react-router-dom";
import useResetPassword from "../../hooks/ResetPasswordHooks/ResetPasswordHook";
import ResetPasswordComponent from "../../components/ResetPasswordComponent/ResetPasswordComponent";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    message,
    error,
    handleResetPassword,
  } = useResetPassword();

  return (
    <ResetPasswordComponent
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      message={message}
      error={error}
      handleResetPassword={handleResetPassword}
      token={token}
    />
  );
};

export default ResetPasswordPage;
