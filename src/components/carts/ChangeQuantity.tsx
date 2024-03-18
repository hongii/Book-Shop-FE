import { useCarts } from "@/hooks/useCarts";
import styled from "styled-components";
import Button from "../common/Button";
import InputText from "../common/InputText";
import { useState } from "react";

interface Props {
  onDecrease: () => void;
  onIncrease: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  quantity: number;
  cartItemId: number;
}
const ChangeQuantity = ({ onDecrease, onIncrease, onChange, quantity, cartItemId }: Props) => {
  const { changeQuantity } = useCarts();
  const [initialQuantity, setInitialQuantity] = useState<number>(quantity);

  const handleChangeQuantity = () => {
    // 현재 수량과 변경할 수량이 같다면 요청을 무시
    if (quantity === initialQuantity) {
      return;
    }

    changeQuantity({ cartItemId, quantity });
    setInitialQuantity(quantity);
  };
  return (
    <ChangeQuantityStyle>
      <div className="input-btn">
        <Button className="change-btn" size="medium" scheme="normal" onClick={onDecrease}>
          -
        </Button>
        <InputText type="number" value={quantity} onChange={onChange} />
        <Button className="change-btn" size="medium" scheme="normal" onClick={onIncrease}>
          +
        </Button>
      </div>
      <Button size="medium" scheme="primary" onClick={handleChangeQuantity}>
        수량 변경
      </Button>
    </ChangeQuantityStyle>
  );
};

const ChangeQuantityStyle = styled.div`
  display: flex;
  flex-wrap: wrap;

  gap: 2rem;

  .input-btn {
    border-radius: ${({ theme }) => theme.borderRadius.default};
    display: flex;
    align-items: center;

    input {
      font-size: 1.6rem;
      height: 100%;
      width: 50px;
      text-align: center;
      border-radius: 0;
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    button {
      height: 100%;
    }
    .change-btn {
      padding: 0.8rem;
      border-radius: 0;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    .input-btn {
      font-size: 2.2rem;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    .input-btn {
      font-size: 1.8rem;
    }
  }
`;

export default ChangeQuantity;
