import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Header from './Components/Header/Header'
import Bebidas from './Pages/Bebidas/Bebidas'
import Cafes from './Pages/Cafes/Cafes'
import Comidas from './Pages/Comidas/Comidas'
import Desayunos from './Pages/Desayunos/Desayunos'
import Reposteria from './Pages/Reposteria/Reposteria'
import { RegisterPage } from "./Pages/Register/registerPage";
import { AuthProvider } from "./context/AuthContext";
import { LoginPage } from "./Pages/LoginPage/LoginPage";


function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Desayunos />} />
        {/* <Route path="desayunos" element={<Desayunos />} /> */}
        <Route path="cafes" element={<Cafes />} />
        <Route path="reposteria" element={<Reposteria />} />
        <Route path="comidas" element={<Comidas />} /> 
        <Route path="bebidas" element={<Bebidas />} />
        <Route path="registro" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
