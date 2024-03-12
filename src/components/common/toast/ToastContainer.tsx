import { useToastStore } from "@/store/toastStore";
import styled from "styled-components";
import Toast from "@/components/common/toast/Toast";

const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <ToastContainerStyle>
      {toasts.map((toast) => (
        <Toast key={toast.id} id={toast.id} message={toast.message} type={toast.type} />
      ))}
    </ToastContainerStyle>
  );
};

const ToastContainerStyle = styled.div`
  position: fixed;
  top: 80px;
  right: 16px;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export default ToastContainer;
