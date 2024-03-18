import styled from "styled-components";
import { Cart } from "@/models/cart.model";
import { formatNumber } from "@/utils/format";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
import CheckIconButton from "@/components/carts/CheckIconButton";
import { useMemo, useState } from "react";
import { useAlert } from "@/hooks/useAlert";
import { getImgSrc } from "@/utils/image";
import { useNavigate } from "react-router-dom";
import ChangeQuantity from "@/components/carts/ChangeQuantity";

interface CartsProps {
  cart: Cart;
  selectedItems: number[];
  onSelected: (id: number) => void;
  onDeleted: (id: number) => void;
}

const CartItem = ({ cart, selectedItems, onSelected, onDeleted }: CartsProps) => {
  const { showConfirm } = useAlert();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState<number>(cart.quantity);
  const isSelected = useMemo(
    () => selectedItems.includes(cart.cartItemId),
    [selectedItems, cart.cartItemId],
  );

  const handleOnClick = () => {
    onSelected(cart.cartItemId);
  };

  const handleOnDelete = () => {
    showConfirm("선택한 상품을 삭제하시겠어요?", () => {
      if (selectedItems.includes(cart.cartItemId)) {
        // 체크표시 누른 상태에서 아이템 삭제 누른경우 -> selectedItems에서도 해당 아이템 제거해야함
        onSelected(cart.cartItemId);
      }
      onDeleted(cart.cartItemId);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuantity(inputValue === "" ? 1 : parseInt(inputValue));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev - 1 > 0 ? prev - 1 : 1));
  };

  return (
    <CartItemStyle>
      <div className="check-content-container">
        <CheckIconButton isSelected={isSelected} onClick={handleOnClick} />
        <div className="book-img" onClick={() => navigate(`/books/${cart.bookId}`)}>
          <img src={getImgSrc(+cart.imgUrl)} alt="book-img" />
        </div>
        <div className="book-contents">
          <h1 className="title">{cart.title}</h1>
          <p className="price">{`${formatNumber(cart.price)}원`}</p>
          <p className="quantity">{cart.quantity}권</p>
          <ChangeQuantity
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
            onChange={handleChange}
            cartItemId={cart.cartItemId}
            quantity={quantity}
          />
        </div>
      </div>
      <button className="delete-btn" onClick={handleOnDelete}>
        <IoCloseOutline />
      </button>
    </CartItemStyle>
  );
};

const CartItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  /* margin: 1.5rem 0; */
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  width: 100%;
  height: 100%;

  .title {
    font-size: 1.7rem;
  }

  p {
    margin: 0;
    font-size: 1.5rem;
  }

  .book-img {
    cursor: pointer;
    img {
      border-radius: ${({ theme }) => theme.borderRadius.default};
      max-width: 130px;
      object-fit: fill;
    }
  }

  .check-content-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .book-contents {
    width: 100%;
    height: 100%;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    select {
    }
  }

  .book-summary {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .delete-btn {
    display: flex;
    align-items: flex-start;
    font-size: 2rem;
    border: none;
    background: none;
    padding: 0;

    svg {
      color: ${({ theme }) => theme.buttonScheme.normal.color};
      cursor: pointer;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    .book-img {
      img {
        max-width: 100px;
      }
    }
    .book-contents {
      .title {
        font-size: 2.2rem;
      }
      p {
        font-size: 2rem;
      }
    }

    .delete-btn {
      width: 3rem;
      height: 3rem;
      svg {
        width: 3rem;
        height: 3rem;
      }
    }
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    .book-contents {
      .title {
        font-size: 2rem;
      }
      p {
        font-size: 1.7rem;
      }
    }
    .delete-btn {
      width: 2.7rem;
      height: 2.7rem;
      svg {
        width: 2.7rem;
        height: 2.7rem;
      }
    }
  }
`;

export default CartItem;
