// src/api/ForgotPasswordProvider.js
import axios from "axios";

const urlforgot = import.meta.env.VITE_URL;

const forgotAccount = async (email) => {
  try {
    const response = await axios.post(`${urlforgot}/send-reset-password-email`, { mail: email });
    return response.data;
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw error;
  }
};

export default forgotAccount;
