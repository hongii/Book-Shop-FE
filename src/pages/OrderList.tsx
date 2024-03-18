import React, { useState } from "react";
import styled from "styled-components";
import Title from "@/components/common/Title";
import { useOrders } from "@/hooks/useOrders";
import { formatDate, formatNumber } from "@/utils/format";
import Button from "@/components/common/Button";
import OrderItemDetail from "@/components/order/OrderItemDetail";

const OrderListPage = () => {
  const { orderList, selectedOrderId, getOrderDetail } = useOrders();
  const [clickOrderId, setClickOrderId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDetailButton = async (orderId: number) => {
    await getOrderDetail(orderId);

    if (clickOrderId === orderId) {
      setIsOpen(false);
      setClickOrderId(null);
    } else {
      setIsOpen(true);
      setClickOrderId(orderId);
    }
  };

  return (
    <OrderListPageStyle>
      <Title size="large">주문 목록</Title>
      <div className="order-contents">
        <table>
          <thead>
            <tr>
              <th>주문 번호</th>
              <th>주문 일자</th>
              <th>배송지 주소</th>
              <th>수령인</th>
              <th>연락처</th>
              <th>대표 상품명</th>
              <th>결제 수량</th>
              <th>결제 금액</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => {
              return (
                <React.Fragment key={order.orderId}>
                  <tr>
                    <td>
                      <div className="order-num">
                        {order.orderId}
                        <Button
                          size="small"
                          scheme="normal"
                          onClick={() => {
                            handleDetailButton(order.orderId);
                          }}
                        >
                          상세보기
                        </Button>
                      </div>
                    </td>
                    <td>{formatDate(order.createdAt, "YYYY.MM.DD")}</td>
                    <td>{order.delivery.address}</td>
                    <td>{order.delivery.receiver}</td>
                    <td>{order.delivery.contact}</td>
                    <td>{order.mainBookTitle}</td>
                    <td>{order.totalQuantity}</td>
                    <td>{formatNumber(order.totalPrice)}원</td>
                  </tr>
                  {selectedOrderId === order.orderId && isOpen && order.detail && (
                    <tr>
                      <td colSpan={8}>
                        {order.detail.map((item) => {
                          return <OrderItemDetail key={item.bookId} orderItem={item} />;
                        })}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </OrderListPageStyle>
  );
};

const OrderListPageStyle = styled.div`
  width: 100%;
  padding: 2rem;

  display: flex;
  flex-direction: column;

  .order-contents {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  table {
    width: 100%;
    margin-top: 1.5rem;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
    word-break: keep-all;

    .order-num {
      display: flex;
      flex-direction: column;
    }
    th,
    td {
      padding: 1rem;
      border-bottom: 1px solid ${({ theme }) => theme.color.border};
      text-align: center;
      font-size: 1.3rem;
    }

    .detail {
      margin: 0;

      li {
        list-style: square;
        text-align: left;

        div {
          display: flex;
          padding: 0.5rem 1rem;
          gap: 0.5rem;
        }
      }
    }
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    table {
      th,
      td {
        font-size: 2rem;
      }
    }
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    table {
      th,
      td {
        font-size: 1.5rem;
      }
    }
  }
`;

export default OrderListPage;
