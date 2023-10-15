import { useState, useEffect } from "react";
import { FaArrowUp, FaPenToSquare, FaRegTrashCan, FaRegSquarePlus, FaImage } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
import { useProduct } from "../../context/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Main ({category}) {
  const [productList, setProductList] = useState([])
  const {getProducts, deleteProduct } = useProduct()
  const { isLogin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const products = async () => {
      const data = await getProducts()
      setProductList(data)
    }
    products()
  }, [])

  const deleteProductIcon = (id) => {
    Swal.fire({
      icon: 'info',
      text: '¿Eliminar?',
      confirmButtonText: 'Aceptar',
      denyButtonText: 'Cancelar',
      confirmButtonColor: 'green',
      denyButtonColor: 'red',
      showDenyButton: true,
    }).then(res=> {
      if (res.isConfirmed) {
        deleteProduct(id).then(res=> {
          if (res.code === 200) {
            const newList = productList.filter(product => product._id !== id)
            setProductList(newList)
            Swal.fire({
              icon: 'info',
              title: '¡Eliminado!',
              showConfirmButton: false,
              timer: 2000
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'No se encuentra',
              showConfirmButton: false,
              timer: 2000
            })
          }
        })
      }
    })
  }

  const navigateToFormProduct = () => {
    navigate('/crear-producto')
  } 


  return (
    <section className="container-product">

     <div className="header-title">
      <h1>{category}</h1>
      {isLogin ? <i onClick={navigateToFormProduct}>Añadir <FaRegSquarePlus /></i> : null}
     </div>

      {productList.map((product, index) => (
        category === product.cat ? 
        <div key={product._id} className='card-product'>
          <div className="info-products">
            <h3 className='desc'>{product.desc}</h3>
            <p>{ product.ingredientes }</p>
            <h3 className='price'>{product.price}</h3>
          </div>
          <div className={isLogin ? 'icons-container show-icons' : 'icons-container none-icons'}>
            <Link to={`/actualizar-producto/${product._id}`} style={{color: '#7FABC2'}}><FaPenToSquare /></Link>
            <Link style={{color: '#7FABC2'}} onClick={() => {deleteProductIcon(product._id)}}><FaRegTrashCan /></Link>            
          </div>
        </div> :
        null
      ))}

    </section>
  )
}

export default Main