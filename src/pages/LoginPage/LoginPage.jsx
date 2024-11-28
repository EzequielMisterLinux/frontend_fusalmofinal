import LoginForm from "../../components/LoginComponent/LoginForm";
import useLogin from "../../hooks/LoginHooks/LoginHooks";
import "./LoginPage.css";

const LoginPage = () => {
    const loginHook = useLogin();

    return (
        <div className='bodyLogin'>
            <div className='wrapper'>
                <LoginForm {...loginHook} />
            </div>
        </div>
    );
};

export default LoginPage;
