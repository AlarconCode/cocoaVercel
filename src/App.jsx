import './App.css'
import Header from './Components/Header/Header'
import Main from './Components/Main/Main'
import data from './data/data.json'
import { FaArrowUp } from "react-icons/fa6";

function App() {
  
  const up = () => {}

  return (
    <>
      <Header />
      <Main data={data} category={data[0].cat} />
      <Main data={data} category={data[11].cat} />
      <Main data={data} category={data[21].cat} />
      <Main data={data} category={data[36].cat} />
      <Main data={data} category={data[39].cat} />
      <Main data={data} category={data[54].cat} />
      <a href="#Desayunos Básicos"><div className='up'><FaArrowUp /></div></a>
      <footer>

      </footer>
    </>
  )
}

export default App
