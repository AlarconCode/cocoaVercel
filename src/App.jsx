import { Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import Header from './Components/Header/Header'
import ListCards from "./Components/ListCards/ListCards";
import { useAuth } from "./context/AuthContext";
import { LoginPage } from "./Pages/LoginPage/LoginPage";
import { ProductFormPage } from "./Pages/ProductFormPage/ProductFormPage";
import { ProductProvider } from "./context/ProductContext";
import { HomePage } from "./Pages/HomePage/HomePage";
import { Footer } from "./Components/Footer/Footer";
import { RegisterPage } from "./Pages/Register/RegisterPage";
import { useEffect } from "react";
import { isAuthRequest } from "./services/user.services";
import Swal from "sweetalert2";


function App() {
  const location = useLocation()
  const {isLogin, setIsLogin} = useAuth()

  useEffect(() => {
    const checkAuth = async () => {
      const res = await isAuthRequest();
      console.log(res);
      if (!res.error && res.message === 'token verified') {
        setIsLogin(true);
      } else if (res.error && res.message[0] === 'Token required') {
        setIsLogin(false);
        if (location.pathname !== '/login' && location.pathname !== '/registro') {
          Swal.fire({
            title: 'Inicia sesión para continuar',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#7FABC2',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/login';
            } 
          });
        }
      }
    };
  
    if (!isLogin && location.pathname !== '/login' && location.pathname !== '/registro') {
      checkAuth();
    }
  }, []);

  return (
   
      <ProductProvider>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="desayunos" element={<ListCards category='Desayunos' />} />
            <Route path="cafes" element={<ListCards category='cafes' />} />
            <Route path="reposteria" element={<ListCards category='Repostería Casera' />} />
            <Route path="comidas" element={<ListCards category='Comidas' />} /> 
            <Route path="bebidas" element={<ListCards category='Bebidas' />} />
            <Route path="crear-producto" element={<ProductFormPage />} />
            <Route path="actualizar-producto/:id" element={<ProductFormPage />} />
            <Route path="registro" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
          </Routes>
          {location.pathname !== '/login' && location.pathname !== '/registro'  && <Footer />}
      </ProductProvider>
  )
}

export default App
