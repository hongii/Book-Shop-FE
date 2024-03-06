import { useLocation } from "react-router-dom";
import styled from "styled-components";

const OrderPage = () => {
  const location = useLocation();
  // 장바구니 페이지에서 navigate의 state에 담아서 보낸 데이터를
  // useLocation 훅을 통해 location.state로 부터 꺼내올 수 있다.
  const orderDataFromCart = location.state;
  console.log(orderDataFromCart);
  return <OrderPageStyle></OrderPageStyle>;
};

const OrderPageStyle = styled.div``;

export default OrderPage;
