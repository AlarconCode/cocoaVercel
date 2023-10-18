import { useState, useEffect } from "react";
import {
  FaArrowUp,
  FaPenToSquare,
  FaRegTrashCan,
  FaRegSquarePlus,
  FaImage,
} from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
import { useProduct } from "../../context/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logoCocoa from "../../assets/icons/taza-cocoa-marron.svg";

function Main(props) {
  const category = props.category;
  const [productList, setProductList] = useState([]);
  const [flippedState, setFlippedState] = useState({});
  const { getProducts, deleteProduct } = useProduct();
  const { isLogin } = useAuth();
  const navigate = useNavigate();

  const handleClickFlipped = (index) => {
    setFlippedState({
      isFlipped: !flippedState.isFlipped,
      [index]: !flippedState[index],
    });
  };

  console.log(flippedState);

  useEffect(() => {
    const products = async () => {
      const data = await getProducts(category);
      setProductList(data);
    };
    products();
  }, [category, getProducts]);

  const deleteProductIcon = (id) => {
    Swal.fire({
      icon: "info",
      text: "¿Eliminar?",
      confirmButtonText: "Aceptar",
      denyButtonText: "Cancelar",
      confirmButtonColor: "green",
      denyButtonColor: "red",
      showDenyButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        deleteProduct(id).then((res) => {
          if (res.code === 200) {
            const newList = productList.filter((product) => product._id !== id);
            setProductList(newList);
            Swal.fire({
              icon: "info",
              title: "¡Eliminado!",
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "No se encuentra",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      }
    });
  };

  const navigateToFormProduct = () => {
    navigate("/crear-producto");
  };

  return (
    <section className="container-product">
      <div className="header-title">
        <h1>{category === "cafes" ? "Cafes 100% Arábigo" : category}</h1>
        {isLogin ? (
          <i onClick={navigateToFormProduct}>
            Añadir <FaRegSquarePlus />
          </i>
        ) : null}
      </div>

      {productList.map((product, index) => (
        <>
          <div
            key={product._id}
            className={`card ${flippedState[index] ? "flipped" : ""}`}
            onClick={() => handleClickFlipped(index)}
          >
            <div className="card-product front">
              <div className="description-product">
                <h3>{product.desc}</h3>
                <p>{product.ingredientes}</p>
                <h2 className="price">{product.price}</h2>
              </div>
              <div className={isLogin ? "icons-container show" : "hide"}>
                <Link
                  to={`/actualizar-producto/${product._id}`}
                  style={{ color: "#7FABC2" }}
                >
                  <FaPenToSquare />
                </Link>
                <Link
                  style={{ color: "#7FABC2" }}
                  onClick={() => {
                    deleteProductIcon(product._id);
                  }}
                >
                  <FaRegTrashCan />
                </Link>
              </div>
            </div>
            <div className="card-product back">
              {product.img ? (
                <img
                  alt={product.desc}
                  src={product.img}
                  className="img-product"
                />
              ) : (
                <img
                  alt={product.desc}
                  src={logoCocoa}
                  className="logoCocoa"
                />
              )}
            </div>
          </div>
        </>
      ))}
    </section>
  );
}

export default Main;
