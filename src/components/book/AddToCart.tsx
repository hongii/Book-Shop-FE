import styled from "styled-components";
import InputText from "../common/InputText";
import Button from "../common/Button";
import { useState } from "react";
import { BookDetail } from "../../models/book.model";
import { Link } from "react-router-dom";
import { useBookDetail } from "../../hooks/useBookDetail";

interface Props {
  book: BookDetail;
}

const AddToCart = ({ book }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart, isAddToCart } = useBookDetail(book.id.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev - 1 > 0 ? prev - 1 : 1));
  };

  return (
    <AddToCartStyle $isAddToCart={isAddToCart}>
      <div className="count">
        <InputText type="number" value={quantity} onChange={handleChange} readOnly />
        <Button size="medium" scheme="normal" onClick={handleIncrease}>
          +
        </Button>
        <Button size="medium" scheme="normal" onClick={handleDecrease}>
          -
        </Button>
      </div>
      <Button
        size="medium"
        scheme="primary"
        onClick={() => {
          addToCart(quantity);
        }}
      >
        장바구니에 담기
      </Button>
      <div className="add-message">
        <p>장바구니에 추가되었습니다.</p>
        <Link to="/carts">보러가기</Link>
      </div>
    </AddToCartStyle>
  );
};

interface AddToCartStyleProps {
  $isAddToCart: boolean;
}

const AddToCartStyle = styled.div<AddToCartStyleProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 1rem;
  height: 100%;

  .count {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    gap: 0.1rem;
    height: 100%;

    input {
      text-align: center;
      outline: none;
      height: 100%;
    }
  }

  .add-message {
    position: absolute;
    top: 40%;
    left: 50%;
    background-color: ${({ theme }) => theme.color.background};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 1rem 1.5rem;
    transform: translate(-50%, -50%);
    box-shadow: ${({ theme }) => theme.borderShadow.listShadow};
    opacity: ${({ $isAddToCart }) => ($isAddToCart ? "1" : "0")};
    pointer-events: ${({ $isAddToCart }) => ($isAddToCart ? "auto" : "none")};
    transition: all 0.5s ease;

    p {
      color: ${({ theme }) => theme.color};
    }

    a {
      font-weight: 600;
      font-size: 1.3rem;
    }
  }
`;

export default AddToCart;
