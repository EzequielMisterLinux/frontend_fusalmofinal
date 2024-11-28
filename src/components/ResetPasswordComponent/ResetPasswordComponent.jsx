/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

const ResetPasswordComponent = ({ password, setPassword, confirmPassword, setConfirmPassword, message, error, handleResetPassword, token }) => {
  return (
    <div css={tw`max-w-md mx-auto p-6 bg-white shadow-md rounded-lg`}>
      <h2 css={tw`text-2xl font-bold mb-4`}>Restablecer Contraseña</h2>
      {message && <p css={tw`text-green-500 mb-4`}>{message}</p>}
      {error && <p css={tw`text-red-500 mb-4`}>{error}</p>}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Nueva contraseña"
        css={tw`w-full p-3 border rounded mb-4`}
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirmar nueva contraseña"
        css={tw`w-full p-3 border rounded mb-4`}
      />
      <button onClick={() => handleResetPassword(token)} css={tw`w-full bg-blue-500 text-white p-3 rounded`}>
        Restablecer Contraseña
      </button>
    </div>
  );
};

export default ResetPasswordComponent;
