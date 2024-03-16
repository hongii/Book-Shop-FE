import styled from "styled-components";
import InputText from "@/components/common/InputText";
import Button from "@/components/common/Button";
import { useState } from "react";
import { BookDetail } from "@/models/book.model";
import { Link, useNavigate } from "react-router-dom";
import { useBookDetail } from "@/hooks/useBookDetail";
import { useAlert } from "@/hooks/useAlert";
import { useAuthStore } from "@/store/authStore";

interface Props {
  book: BookDetail;
}

const AddToCart = ({ book }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart, isAddToCart, message } = useBookDetail(book.id.toString());
  const { isLoggedIn } = useAuthStore();
  const { showConfirm } = useAlert();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      showConfirm("로그인이 필요합니다. 로그인 후 이용해주세요.", () => navigate("/login"));
      return;
    }

    addToCart({ bookId: book.id, quantity });
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
      <Button size="medium" scheme="primary" onClick={handleAddToCart}>
        장바구니에 담기
      </Button>
      <div className="add-message">
        <p>{message}</p>
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

  .count {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    gap: 0.1rem;

    input {
      text-align: center;
      outline: none;
      padding: 0.5rem 1.5rem;
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
      color: ${({ theme }) => theme.color.text};
    }

    a {
      font-weight: 600;
      font-size: 1.3rem;
      color: ${({ theme }) => theme.color.third};
    }
  }
`;

export default AddToCart;
