import styled from "styled-components";
import InputText from "@/components/common/InputText";
import Button from "@/components/common/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "@/hooks/useAlert";
import { useAuthStore } from "@/store/authStore";
import { AladinBookDetail } from "@/models/aladinBook.model";
import { useAladinBookDetail } from "@/hooks/useAladinBookDetail";
import Loading from "@/components/common/Loading";

interface Props {
  book: AladinBookDetail;
}

const AddToCart = ({ book }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart, isAddToCart, message, bookDetail } = useAladinBookDetail(
    book.itemId.toString(),
  );
  const { isLoggedIn } = useAuthStore();
  const { showConfirm } = useAlert();
  const navigate = useNavigate();

  if (!bookDetail) return <Loading />;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuantity(inputValue === "" ? 1 : parseInt(inputValue));
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      showConfirm("로그인이 필요합니다. 로그인 후 이용해주세요.", () => navigate("/login"));
      return;
    }

    addToCart({ bookId: book.itemId, quantity, info: bookDetail });
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
        <InputText type="number" value={quantity} onChange={handleChange} />
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
  flex-wrap: wrap;
  gap: 1rem;

  .count {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: nowrap;
    gap: 0.15rem;

    input {
      text-align: center;
      outline: none;
      height: 100%;
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  .add-message {
    position: fixed;
    top: 50vmin;
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
      font-weight: 700;
      color: ${({ theme }) => theme.color.third};
    }
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    a {
      font-size: 2.2rem;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    a {
      font-size: 1.8rem;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    a {
      font-size: 1.6rem;
    }
  }
`;

export default AddToCart;
