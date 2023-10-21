import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaPenToSquare,
  FaRegTrashCan,
} from "react-icons/fa6";
import logoCocoa from "../../assets/icons/taza-cocoa-marron.svg";

export const Card = (product, index) => {
  const {_id, desc, ingredientes, price, img} = product

  const { isLogin } = useAuth();
  const [flippedState, setFlippedState] = useState({});

  const handleClickFlipped = (index) => {
    setFlippedState({
      isFlipped: !flippedState.isFlipped,
      [index]: !flippedState[index],
    });
  };


  return (
    <>
      <div
            key={_id}
            className={`card ${flippedState[index] ? "flipped" : ""}`}
            onClick={() => handleClickFlipped(index)}
          >
            <div className="card-product front">
              <div className="description-product">
                <h3>{desc}</h3>
                <p>{ingredientes}</p>
                <h2 className="price">{price}</h2>
              </div>
              <div className={isLogin ? "icons-container show" : "hide"}>
                <Link
                  to={`/actualizar-producto/${_id}`}
                  style={{ color: "#7FABC2" }}
                >
                  <FaPenToSquare />
                </Link>
                <Link
                  style={{ color: "#7FABC2" }}
                  onClick={() => {
                    deleteProductIcon(_id);
                  }}
                >
                  <FaRegTrashCan />
                </Link>
              </div>
            </div>
            <div className="card-product back">
              {img ? (
                <img
                  alt={desc}
                  src={img}
                  className="img-product"
                />
              ) : (
                <img
                  alt={desc}
                  src={logoCocoa}
                  className="logoCocoa"
                />
              )}
            </div>
          </div>
    </>
  )
}