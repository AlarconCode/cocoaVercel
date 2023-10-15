import { Link, useNavigate } from "react-router-dom"
import { FaArrowUp, FaPenToSquare, FaRegTrashCan, FaRegSquarePlus, FaImage } from "react-icons/fa6";



export const HomePage = () => {
  const navigate = useNavigate()
  
  const navigateToFormProduct = () => {
    navigate('/crear-producto')
  }  
  
  return (
    <section className="homepage-container">
      <Link to='/desayunos'>
        <div className='card-product homepage-link'>
          <h1>Desayunos</h1> 
        </div>
      </Link>
      <Link to='/cafes'>
        <div className='card-product homepage-link'>
          <h1>Cafés</h1> 
        </div>
      </Link>
      <Link to='/reposteria'>
        <div className='card-product homepage-link'>
          <h1>Repostería</h1> 
        </div>
      </Link>
      <Link to='/comidas'>
        <div className='card-product homepage-link'>
          <h1>Comidas</h1> 
        </div>
      </Link>
      <Link to='/bebidas'>
        <div className='card-product homepage-link'>
          <h1>Bebidas</h1> 
        </div>
      </Link>
    </section>
  )
}