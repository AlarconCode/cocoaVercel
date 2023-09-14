import './App.css'
import Header from './Components/Header/Header'
import Main from './Components/Main/Main'
import data from './data/data.json'
import { FaArrowUp } from "react-icons/fa6";

function App() {

  return (
    <>
      <Header />
      <Main data={data} category={data[0].cat} />
      <Main data={data} category={data[10].cat} />
      <Main data={data} category={data[20].cat} />
      <Main data={data} category={data[39].cat} />
      <Main data={data} category={data[57].cat} />
      <Main data={data} category={data[69].cat} />
      <a href="#Desayunos Básicos"><div className='up'><FaArrowUp /></div></a>
      <footer>

      </footer>
    </>
  )
}

export default App
