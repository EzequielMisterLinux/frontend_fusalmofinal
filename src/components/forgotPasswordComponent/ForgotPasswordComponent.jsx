/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

const ForgotPasswordComponent = ({ email, setEmail, message, error, handleForgotPassword }) => {
  return (
    <div css={tw`max-w-md mx-auto p-6 bg-white shadow-md rounded-lg`}>
      <h2 css={tw`text-2xl font-bold mb-4`}>Recuperar Contraseña</h2>
      {message && <p css={tw`text-green-500 mb-4`}>{message}</p>}
      {error && <p css={tw`text-red-500 mb-4`}>{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo electrónico"
        css={tw`w-full p-3 border rounded mb-4`}
      />
      <button onClick={handleForgotPassword} css={tw`w-full bg-blue-500 text-white p-3 rounded`}>
        Enviar Correo de Recuperación
      </button>
    </div>
  );
};

export default ForgotPasswordComponent;
