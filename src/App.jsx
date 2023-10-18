import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Header from './Components/Header/Header'
import Main from "./Components/Main/Main";
import { RegisterPage } from "./Pages/Register/registerPage";
import { AuthProvider } from "./context/AuthContext";
import { LoginPage } from "./Pages/LoginPage/LoginPage";
import { ProductFormPage } from "./Pages/ProductFormPage/ProductFormPage";
import { ProductProvider } from "./context/ProductContext";
import { HomePage } from "./Pages/HomePage/HomePage";


function App() {

  return (
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="desayunos" element={<Main category='Desayunos' />} />
          <Route path="cafes" element={<Main category='cafes' />} />
          <Route path="reposteria" element={<Main category='Repostería Casera' />} />
          <Route path="comidas" element={<Main category='Comidas' />} /> 
          <Route path="bebidas" element={<Main category='Bebidas' />} />
          <Route path="crear-producto" element={<ProductFormPage />} />
          <Route path="actualizar-producto/:id" element={<ProductFormPage />} />
          <Route path="registro" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </ProductProvider>
    </AuthProvider>
  )
}

export default App
