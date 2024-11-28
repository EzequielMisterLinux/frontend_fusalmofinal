import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import HeaderDefault from "../../components/header/HeaderComponent";
import SubCategoryPage from "../SubCategoryPage/UpdateSubCategoryPage";
import EmployeListPage from "../EmployeListPage/EmployeListPage";
import LoginRegisterPage from "../LoginRegisterPage/LoginRegisterPage";
import ProductListPage from "../ProductPage/ProductPage";
import ForgotPasswordPage from "../ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../ResetPasswordPage/ResetPasswordPage";
import PrivateRoute from '../../components/PrivateRoute';
import { UpdateProductPage } from "../UpdateProductPage/UpdateProductPage";
import InventaryPage from "../InventaryPage/InventaryPage";
import CategoryPage from "../CategoryPage/CategoryUpdatePage";
import Home from "../../components/home/HomeComponent";
const DashboardPage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute element={HeaderDefault} />
          }
        >
          <Route index element={<Home />} />
          <Route path="products" element={<ProductListPage />} />
          <Route path="employees" element={<EmployeListPage />} />
          <Route path="register" element={<LoginRegisterPage />} />
          <Route path="subcategories" element={<SubCategoryPage/>} />
          <Route path="categories" element={<CategoryPage/>} />
          <Route path="update/:id" element={<UpdateProductPage />} />
          <Route path="inventary" element={<InventaryPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default DashboardPage;