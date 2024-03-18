import styled from "styled-components";
import Title from "@/components/common/Title";
import { useCarts } from "@/hooks/useCarts";
import { useState } from "react";
import Empty from "@/components/common/Empty";
import { IoCartOutline } from "@react-icons/all-files/io5/IoCartOutline";
import { FaBook } from "@react-icons/all-files/fa/FaBook";
import CartSummary from "@/components/carts/CartSummary";
import Button from "@/components/common/Button";
import { useAlert } from "@/hooks/useAlert";
import { CartItem, Order } from "@/models/order.model";
import CartItemComponent from "@/components/carts/CartItem";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/common/Loading";

const CartPage = () => {
  const { carts, isEmpty, message, isCartsLoading, deletedCartItem } = useCarts();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  if (isCartsLoading || !carts) {
    return <Loading />;
  }

  const totalQuantity = carts?.reduce((acc, item) => {
    if (selectedItems.includes(item.cartItemId)) {
      return acc + item.quantity;
    }
    return acc;
  }, 0);

  const totalPrice = carts?.reduce((acc, item) => {
    if (selectedItems.includes(item.cartItemId)) {
      return acc + item.price * item.quantity;
    }
    return acc;
  }, 0);

  const handleSelected = (id: number) => {
    if (selectedItems.includes(id)) {
      // 이미 체크한 id인 경우 -> 체크해제
      setSelectedItems((prev) => prev.filter((selectedId) => selectedId !== id));
    } else {
      // 체크 안되어있는 id인 경우 -> 체크처리
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleDeleted = (id: number) => {
    deletedCartItem(id);
  };

  const handleOrder = () => {
    if (selectedItems.length === 0) {
      showAlert("주문할 상품을 선택해 주세요.");
      return;
    }

    // 주문서 작성 페이지로 이동하기 전에 주문서 작성할 때 필요한 데이터를 넘겨줌(배송지 정보는 제외)
    const orderItems: CartItem[] = carts
      ?.filter((item) => selectedItems.includes(item.cartItemId))
      .map((item) => ({
        cartItemId: item.cartItemId,
        bookId: item.bookId,
        quantity: item.quantity,
      }));

    const mainBookTitle = carts?.find(({ cartItemId }) => cartItemId === selectedItems[0])
      ?.title as string;

    const orderData: Omit<Order, "delivery"> = {
      items: orderItems,
      mainBookTitle,
      totalPrice,
      totalQuantity,
    };

    const orderTotalData = carts.filter((item) => selectedItems.includes(item.cartItemId));
    console.log(orderTotalData);
    navigate("/orders", { state: { orderData, orderTotalData } });
  };

  return (
    <CartPageStyle>
      <Title size="large">장바구니</Title>
      {isEmpty ? (
        <div className="empty">
          <Empty
            icon={<IoCartOutline />}
            title={message as string}
            linkIcon={<FaBook />}
            link="/books"
            linkMsg="전체 도서 보러가기"
          />
        </div>
      ) : (
        <section className="container">
          <div className="contents">
            {carts.map((item) => (
              <CartItemComponent
                key={item.cartItemId}
                cart={item}
                selectedItems={selectedItems}
                onSelected={handleSelected}
                onDeleted={handleDeleted}
              />
            ))}
          </div>
          <div className="summary">
            <CartSummary totalPrice={totalPrice} totalQuantity={totalQuantity} />
            <Button size="large" scheme="primary" onClick={handleOrder}>
              주문하기
            </Button>
          </div>
        </section>
      )}
    </CartPageStyle>
  );
};

export const CartPageStyle = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 2rem;

  .empty {
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
  }

  .contents {
    flex: 3 1 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 0;
    min-width: 250px;
    width: 70%;
  }

  .summary {
    display: flex;
    flex-direction: column;
    flex: 1 1 30%;
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    .container {
      flex-wrap: wrap;
    }
  }
`;

export default CartPage;
