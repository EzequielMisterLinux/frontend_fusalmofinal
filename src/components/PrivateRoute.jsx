import { Outlet } from  "react-router-dom";
import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component }) => {
  const cookieToken = Cookies.get('token');
  const localStorageToken = localStorage.getItem('token');
  const token = cookieToken || localStorageToken;
  
  console.log("Token from cookie in PrivateRoute:", token);
  
  if (!token) {
    return <Navigate to="/" />;
  }
  
  return (
    <Component>
      <Outlet />
    </Component>
  );
};

export default PrivateRoute;