import './App.css'
import Header from './Components/Header/Header'
import Main from './Components/Main/Main'
import data from './data/data.json'

function App() {
  
  return (
    <>
      <Header />
      <Main data={data} category={data[0].cat} />
      <Main data={data} category={data[11].cat} />
      <Main data={data} category={data[21].cat} />
      <Main data={data} category={data[36].cat} />
      <Main data={data} category={data[39].cat} />
      <Main data={data} category={data[54].cat} />
      <div></div>
      <footer>

      </footer>
    </>
  )
}

export default App
