import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import axios from 'axios';
import Cookies from 'js-cookie';
import logo from '../../assets/logoabsolutetecnology.svg';

axios.defaults.withCredentials = true;
const urllogout = import.meta.env.VITE_URL;

const NavLink = styled(Link)(() => [
  tw`text-white text-lg mx-4 px-4 py-2 transition-colors duration-300`,
  css`
    position: relative;
    font-family: 'Arial', sans-serif;
    &:hover {
      color: #3498db; /* Azul empresarial */
      text-shadow: 0 0 5px #3498db, 0 0 10px #3498db, 0 0 15px #3498db;
    }
    &:before {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: #3498db; /* Azul empresarial */
      transition: width 0.3s ease-in-out;
    }
    &:hover:before {
      width: 100%;
    }
  `,
]);

const ButtonAddUser = styled(Link)(() => [
  tw`bg-blue-600 text-white text-lg px-4 py-2 rounded transition-colors duration-300 mx-4`,
  css`
    font-family: 'Arial', sans-serif;
    &:hover {
      background-color: #2980b9; /* Azul oscuro al pasar el cursor */
      box-shadow: 0 0 5px #2980b9, 0 0 10px #2980b9, 0 0 15px #2980b9;
    }
  `,
]);

const HomeLink = styled(NavLink)``;
const ProductsLink = styled(NavLink)``;
const ProviderLink = styled(NavLink)``;
const UsersLink = styled(NavLink)``;
const CategoryLink = styled(NavLink)``;
const SubcategoryLink = styled(NavLink)``;


const NavbarContainer = styled.div(() => [
  tw`w-full bg-[#042F40] p-4 flex justify-between items-center shadow-lg`,
]);

const Logo = styled.div(() => [
  tw`flex items-center text-white text-2xl font-bold`,
  css`
    img {
      height: 70px; /* Ajusta el tamaño de la imagen según sea necesario */
      margin-right: 10px; /* Espacio entre el logo y el texto */
    }
  `,
]);

const NavLinksContainer = styled.div(() => [
  tw`flex items-center text-white`, // Añadido: texto blanco para todos los enlaces y botones
]);

const NavbarDefault = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${urllogout}/logout`);

      localStorage.removeItem('token');

      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <NavbarContainer>
      <Logo>
        <img src={logo} alt="Logo" />
        Absolute Technology
      </Logo>
      <NavLinksContainer>
      <ProviderLink to="/dashboard/">Home</ProviderLink>
        <ProviderLink to="/dashboard/inventary">Inventary</ProviderLink>
        <ProductsLink to="/dashboard/categories">Categories</ProductsLink>
        <SubcategoryLink to="/dashboard/subcategories">SubCategories</SubcategoryLink>
        <CategoryLink to="/dashboard/products">Products</CategoryLink>
        <UsersLink to="/dashboard/employees">Users</UsersLink>

        <button onClick={handleLogout} tw="bg-red-600 text-white text-lg px-4 py-2 rounded transition-colors duration-300 mx-4">
          Logout
        </button>
      </NavLinksContainer>
    </NavbarContainer>
  );
};

export default NavbarDefault;