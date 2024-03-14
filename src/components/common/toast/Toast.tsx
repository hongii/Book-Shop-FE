import { ToastItem, useToastStore } from "@/store/toastStore";
import styled from "styled-components";
import { FaBan } from "@react-icons/all-files/fa/FaBan";
import { AiFillInfoCircle } from "@react-icons/all-files/ai/AiFillInfoCircle";
import { IoClose } from "@react-icons/all-files/io5/IoClose";
import { useState } from "react";
import { useTimeout } from "@/hooks/useTimeout";

export const TOAST_REMOVE_DELAY_TIME = 3000;

const Toast = ({ id, message, type }: ToastItem) => {
  const removeToast = useToastStore((state) => state.removeToast);
  const [isFadeOut, setIsFadeOut] = useState<boolean>(false);

  const handleRemoveToast = () => {
    setIsFadeOut(true);
  };

  const handleAnimationEnd = () => {
    if (isFadeOut) {
      removeToast(id);
    }
  };

  useTimeout(() => {
    setIsFadeOut(true);
  }, TOAST_REMOVE_DELAY_TIME);

  return (
    <ToastStyle className={isFadeOut ? "fade-out" : "fade-in"} onAnimationEnd={handleAnimationEnd}>
      <p className="content">
        {type === "info" ? <AiFillInfoCircle /> : <FaBan />}
        {message}
      </p>
      <button className="closed-button" onClick={handleRemoveToast}>
        <IoClose />
      </button>
    </ToastStyle>
  );
};

const ToastStyle = styled.div`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  &.fade-in {
    animation: fade-in 0.3s ease-in-out forwards;
  }

  &.fade-out {
    animation: fade-out 0.3s ease-in-out forwards;
  }

  background-color: ${({ theme }) => theme.color.toastColor};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  /* opacity: 0; */
  /* transition: all 0.3s ease-in-out; */

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
  font-size: 1.45rem;

  svg {
    height: 2rem;
    width: 2rem;
  }

  .content {
    display: flex;
    flex: 1;
    gap: 0.8rem;
    align-items: center;
    margin: 0;
  }

  .closed-button {
    font-size: 1.45rem;
    font-weight: bold;
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }
`;

export default Toast;
