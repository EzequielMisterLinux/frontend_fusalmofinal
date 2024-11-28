import axios from "axios";

const urlReset = import.meta.env.VITE_URL;

const verifyResetTokenAndUpdatePassword = async (token, passw) => {
  try {
    const response = await axios.post(`${urlReset}/verify-reset-password-token`, { token, passw });
    return response.data;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

export default verifyResetTokenAndUpdatePassword;
