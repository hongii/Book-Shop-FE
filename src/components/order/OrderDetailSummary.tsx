import { Cart } from "@/models/cart.model";
import { formatNumber } from "@/utils/format";
import styled from "styled-components";

interface Props {
  orderItems: Cart[];
}
const OrderDetailSummary = ({ orderItems }: Props) => {
  console.log(orderItems);
  return (
    <OrderDetailSummaryStyle>
      {orderItems.map((item) => {
        return (
          <div key={item.bookId} className="order-data">
            <ImgBackground url={item.cover}></ImgBackground>

            <div className="order-contents">
              <p>{item.title}</p>
              <p className="sub-contents">
                <span>{formatNumber(item.priceStandard)}원</span>
                <span>{item.quantity}권</span>
              </p>
              <p className="total-price">
                총 금액 {formatNumber(item.priceStandard * item.quantity)}원
              </p>
            </div>
          </div>
        );
      })}
    </OrderDetailSummaryStyle>
  );
};

interface ImgBackgroundProps {
  url: string;
}

const ImgBackground = styled.div<ImgBackgroundProps>`
  flex: 1 1 25%;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  background-position: center;
  background-image: url(${({ url }) => url});
  background-size: cover;
  background-repeat: no-repeat;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    flex: 1 1 50%;
  }
`;

const OrderDetailSummaryStyle = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;

  .order-data {
    width: 49%;
    padding: 0.8rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    display: flex;
    justify-content: space-between;

    gap: 1rem;
  }

  .order-contents {
    flex: 1 1 100%;
    p {
      margin: 0;
      font-size: 1.5rem;
    }
    .total-price {
      color: ${({ theme }) => theme.color.primary};
      font-weight: 600;
    }
  }

  .sub-contents {
    display: flex;
    gap: 1rem;
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    .order-data {
      gap: 1.5rem;
      width: 100%;
    }
    .order-contents {
      flex: 1 1 100%;
      p {
        font-size: 2rem;
      }
    }
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    .order-contents {
      flex: 1 1 100%;
      p {
        font-size: 1.7rem;
      }
    }
  }
`;

export default OrderDetailSummary;
