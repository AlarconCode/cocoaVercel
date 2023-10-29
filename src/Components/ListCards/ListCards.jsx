import { useState, useEffect } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
import { useProduct } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { string } from "prop-types";
import { Card } from "../Card/Card";

function ListCards(props) {
  const category = props.category;
  const [productList, setProductList] = useState([]);
  const { getProducts, deleteProduct } = useProduct();
  const { isLogin } = useAuth();
  const navigate = useNavigate();

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
          {console.log(productList)}
      {productList.map((product, index) => 
        // ¡Ojo Lleva return implícito y no necesita llaves al ser una sola linea!
        <Card
          product={product}
          key={product._id}
          index={index}
          deleteCard={() => {
            deleteProductIcon(product._id);
          }}
        />
      )}
    </section>
  );
}

export default ListCards;

ListCards.propTypes = {
  category: string,
};
