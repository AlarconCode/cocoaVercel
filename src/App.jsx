import './App.css'
import Header from './Components/Header/Header'
import Main from './Components/Main/Main'
import Bebidas from './Pages/Bebidas/Bebidas'
import Cafes from './Pages/Cafes/Cafes'
import Comidas from './Pages/Comidas/Comidas'
import Desayunos from './Pages/Desayunos/Desayunos'
import Reposteria from './Pages/Reposteria/Reposteria'


function App() {

  return (
    <>
      <Header />
      <Desayunos />
      <Cafes />
      <Reposteria />
      <Comidas />
      <Bebidas />
    </>
  )
}

export default App
