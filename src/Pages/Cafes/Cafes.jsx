import Main from "../../Components/Main/Main";
import data from '../../data/data.json'

function Cafes () {
  return (
    <>
    <Main data={data} category={data[20].cat} />
    </>
  )
}

export default Cafes