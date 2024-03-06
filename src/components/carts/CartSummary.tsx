import styled from "styled-components";
import { formatNumber } from "../../utils/format";

interface Props {
  totalQuantity: number;
  totalPrice: number;
}

const CartSummary = ({ totalQuantity, totalPrice }: Props) => {
  return (
    <CartSummaryStyle>
      <h1 className="title">주문 요약</h1>
      <dl>
        <dt>총 주문 수량</dt>
        <dd>{totalQuantity}권</dd>
      </dl>
      <dl>
        <dt>결제 예정 금액</dt>
        <dd>{formatNumber(totalPrice)}원</dd>
      </dl>
    </CartSummaryStyle>
  );
};

const CartSummaryStyle = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  white-space: nowrap;

  .title {
    margin-bottom: 1.5rem;
  }

  dl {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.8rem;
    font-size: 1.2rem;

    dd {
      font-weight: 700;
      color: ${({ theme }) => theme.color.primary};
    }
  }
`;

export default CartSummary;
