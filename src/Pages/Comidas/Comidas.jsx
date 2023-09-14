import Main from "../../Components/Main/Main";
import data from '../../data/data.json'

function Comidas () {
  return (
    <>
    <Main data={data} category={data[39].cat} />
    </>
  )
}

export default Comidas