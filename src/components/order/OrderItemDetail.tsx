import { Link } from "react-router-dom";
import styled from "styled-components";
import { OrderDetail } from "@/models/order.model";
import { formatNumber } from "@/utils/format";

const orderItemInfoList = [
  { label: "도서명", key: "title" },
  { label: "포맷", key: "form" },
  { label: "작가명", key: "author" },
  {
    label: "주문 수량",
    key: "quantity",
  },
  {
    label: "가격",
    key: "priceStandard",
    filter: (orderItem: OrderDetail) =>
      `${formatNumber(orderItem.priceStandard * orderItem.quantity)}원`,
  },
];

interface Props {
  orderItem: OrderDetail;
}

const OrderItemDetail = ({ orderItem }: Props) => {
  return (
    <OrderItemDetailStyle>
      <div className="book-img">
        <Link to={`/books/${orderItem.bookId}`}>
          <img src={orderItem.cover} alt={orderItem.title} />
        </Link>
      </div>

      <div className="contents">
        {orderItemInfoList.map((item) => {
          return (
            <dl key={item.key}>
              <dt>{item.label}</dt>
              <dd>
                {item.filter ? item.filter(orderItem) : orderItem[item.key as keyof OrderDetail]}
              </dd>
            </dl>
          );
        })}
      </div>
    </OrderItemDetailStyle>
  );
};

const OrderItemDetailStyle = styled.div`
  display: flex;
  box-shadow: ${({ theme }) => theme.borderShadow.itemShadow};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  gap: 1rem;

  .book-img {
    border-radius: ${({ theme }) => theme.borderRadius.default};
    overflow: hidden;
    max-width: 100px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .contents {
    padding: 1rem;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    dl {
      margin: 0;
      padding: 0 1rem;
    }

    dt {
      font-size: 1.3rem;
      font-weight: 600;
      color: ${({ theme }) => theme.color.secondary};
      margin-bottom: 0.5rem;
    }

    dd {
      font-size: 1.3rem;
      margin: 0;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    .book-img {
      img {
        max-width: 50px;
      }
    }
    .contents {
      dt {
        font-size: 1.8rem;
      }

      dd {
        font-size: 1.8rem;
      }
    }
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    .book-img {
      img {
        max-width: 60px;
      }
    }
    .contents {
      dt {
        font-size: 1.6rem;
      }

      dd {
        font-size: 1.6rem;
      }
    }
  }
`;

export default OrderItemDetail;
