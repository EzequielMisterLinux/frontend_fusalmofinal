import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = ({ username, setUsername, password, setPassword, error, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h1>Inicio de Sesión</h1>
            {error && <p className="error">{error}</p>}
            <div className='input-box'>
                <input 
                    type="text" 
                    placeholder='Usuario' 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                />
                <FaUserAlt className='icon' />
            </div>
            <div className='input-box'>
                <input 
                    type="password" 
                    placeholder='Contraseña' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
                <FaLock className='icon' />
            </div>

            <div className="remember-forgot">
                <Link to="/forgot-password">¿Has olvidado tu contraseña?</Link>
            </div>

            <button type='submit'>Acceder</button>
        </form>
    );
};

export default LoginForm;
