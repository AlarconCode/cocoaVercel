import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { func, number, shape, string } from 'prop-types'
import {
  FaPenToSquare as ModifyIcon,
  FaRegTrashCan as DeleteIcon,
} from "react-icons/fa6";
import logoCocoa from "../../assets/icons/taza-cocoa-marron.svg";
import styled from "styled-components"

export const Card = ({product, index, deleteCard}) => {
  // Logic Card
  const {_id, desc, ingredientes, price, img} = product
  const { isLogin } = useAuth();
  const [flippedState, setFlippedState] = useState({});

  const handleClickFlipped = (index) => {
    setFlippedState({
      isFlipped: !flippedState.isFlipped,
      [index]: !flippedState[index],
    });
  };

  // JSX Card
  return (
    <>
      <DivCard
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
          <IconsAdmin $isLogin={isLogin}>
            <Link
              to={`/actualizar-producto/${_id}`}
              style={{ color: "#7FABC2" }}
            >
              <ModifyIcon />
            </Link>
            <Link
              style={{ color: "#7FABC2" }}
              onClick={deleteCard}
            >
              <DeleteIcon />
            </Link>
          </IconsAdmin>
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
      </DivCard>
    </>
  )
}

const DivCard = styled.div`
    min-height: 150px;
    position: relative;
    perspective: 1000px;
    transform-style: preserve-3d;
    display: flex;
    justify-content: stretch;

    .card-product {
      background-color: var(--secondary);
      border: 4px dotted var(--primary);
      border-radius: 1rem;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .front {
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
    }

    .back {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      backface-visibility: hidden;
      transition: transform 0.6s;
    }

    .card .back {
      transform: rotateY(180deg);
    }

    .card.flipped .front {
      transform: rotateY(180deg);
    }

    .logoCocoa {
      opacity: .5;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    .card.flipped .back {
      transform: rotateY(360deg);
    }

    .back {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .img-product {
      width: 100%;
      height: 100%;
      border-radius: 1rem;
      object-fit: cover;
    }

    .description-product {
      padding: 1rem;
    }

    .description-product h3 {
      text-align: left;
      font-weight: 500;
      font-size: 1.3rem;
    }

    .price {
      margin-top: 1rem;
      font-size: 1.4rem;
      text-align: right;
    }

`

const IconsAdmin = styled.div`
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 48px;
    background-color: var(--primary);
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
    padding: 1.3rem;
    font-size: 1.3rem;
    display: ${props => props.$isLogin ? 'flex' : 'none'};
` 

Card.propTypes = {
  product: shape({
    _id: string,
    desc: string,
    ingredientes: string,
    price: string,
    img: string
  }),
  index: number,
  deleteCard: func
}