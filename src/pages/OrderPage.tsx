import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import InputText from "@/components/common/InputText";
import { useForm } from "react-hook-form";
import Title from "@/components/common/Title";
import CartSummary from "@/components/carts/CartSummary";
import Button from "@/components/common/Button";
import { CartPageStyle } from "@/pages/CartPage";
import { Delivery, Order } from "@/models/order.model";
import { useAlert } from "@/hooks/useAlert";
import FindAddressButton from "@/components/order/FindAddressButton";
import { requestOrder } from "@/api/order.api";

interface DeliveryProps extends Delivery {
  detailAddress: string;
}

const OrderPage = () => {
  const location = useLocation();
  const orderDataFromCart = location.state;
  const { totalPrice, totalQuantity, mainBookTitle } = orderDataFromCart;
  const { showAlert, showConfirm } = useAlert();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DeliveryProps>();

  const handleError = () => {
    if (errors) {
      showAlert("배송지 정보를 작성해 주세요.");
      return;
    }
  };

  const handlePayment = async (data: DeliveryProps) => {
    const orderData: Order = {
      ...orderDataFromCart,
      delivery: {
        ...data,
        address: `${data.address} ${data.detailAddress}`,
      },
    };

    // 서버로 주문요청하면서 data 전달 => 주문할건지 확인한 후 서버로 주문 요청
    showConfirm("결제를 진행할까요?", async () => {
      const { message } = await requestOrder(orderData);
      showAlert(message);
      navigate("/orderlist");
    });
  };

  return (
    <OrderPageStyle>
      <Title size="large">주문/결제</Title>
      <section className="container">
        <div className="contents">
          <div className="order-info">
            <Title size="medium" color="text">
              주문 상품
            </Title>
            <strong>
              {orderDataFromCart.items.length > 0
                ? `${mainBookTitle} 외 총 ${totalQuantity}권`
                : `${mainBookTitle} 총 ${totalQuantity}권`}
            </strong>
          </div>
          <section className="order-info">
            <Title size="medium" color="text">
              배송지 정보
            </Title>
            <form className="delivery">
              <fieldset>
                <label>받는 분</label>
                <div className="input">
                  <InputText type="text" {...register("receiver", { required: true })} />
                </div>
              </fieldset>
              <fieldset>
                <label>연락처</label>
                <div className="input">
                  <InputText type="text" {...register("contact", { required: true })} />
                </div>
              </fieldset>
              <fieldset>
                <label>주소</label>
                <div className="input">
                  <InputText type="text" {...register("address", { required: true })} />
                  <FindAddressButton
                    onCompleted={(address) => {
                      setValue("address", address);
                    }}
                  />
                </div>
              </fieldset>
              <fieldset>
                <label>상세 주소</label>
                <div className="input">
                  <InputText type="text" {...register("detailAddress", { required: true })} />
                </div>
              </fieldset>
            </form>
          </section>
        </div>
        <div className="summary">
          <CartSummary totalPrice={totalPrice} totalQuantity={totalQuantity} />
          <Button size="large" scheme="primary" onClick={handleSubmit(handlePayment, handleError)}>
            결제하기
          </Button>
        </div>
      </section>
    </OrderPageStyle>
  );
};

const OrderPageStyle = styled(CartPageStyle)`
  .order-info {
    h1 {
      padding: 0 0 1.3rem 0;
    }

    strong {
      font-size: 1.2rem;
    }
    padding: 1rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
  }

  .delivery {
    fieldset {
      border: none;
      margin: 0;
      padding: 0 0 1rem 0;

      display: flex;
      justify-content: flex-start;
      gap: 0.5rem;
      font-size: 1.2rem;

      label {
        width: 80px;
      }

      .input {
        flex: 1;
        display: flex;

        gap: 0.5rem;

        input {
          width: 100%;
          font-size: 1.2rem;
        }
      }
    }
  }
`;

export default OrderPage;
