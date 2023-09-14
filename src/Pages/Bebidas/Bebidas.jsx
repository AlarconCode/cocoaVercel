import Main from "../../Components/Main/Main";
import data from '../../data/data.json'

function Bebidas () {
  return (
    <>
    <Main data={data} category={data[69].cat} />
    </>
  )
}

export default Bebidas