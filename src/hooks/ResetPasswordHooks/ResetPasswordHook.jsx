import { useState } from "react";
import verifyResetTokenAndUpdatePassword from "../../api/ResetPasswordProvider/ResetPasswordProvider";

const useResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (token) => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await verifyResetTokenAndUpdatePassword(token, password);
      setMessage(response.message);
      setError("");
    } catch (err) {
      setError("Error updating password. Please try again.");
      setMessage("");
    }
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    message,
    error,
    handleResetPassword,
  };
};

export default useResetPassword;
