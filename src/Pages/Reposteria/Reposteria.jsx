import Main from "../../Components/Main/Main";
import data from '../../data/data.json'

function Reposteria () {
  return (
    <>
    <Main data={data} category={data[35].cat} />
    </>
  )
}

export default Reposteria