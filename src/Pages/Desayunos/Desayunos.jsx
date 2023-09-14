import Main from "../../Components/Main/Main";
import data from '../../data/data.json'

function Desayunos () {
  return (
    <>
    <Main data={data} category={data[0].cat} />
    <Main data={data} category={data[10].cat} />
    </>
  )
}

export default Desayunos