import styled from "styled-components";
import { IoClose } from "@react-icons/all-files/io5/IoClose";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
  onClosed: () => void;
}

const Modal = ({ children, onClosed }: Props) => {
  const [isFadeout, setIsFadeOut] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsFadeOut(true);
  };

  const handleOverlay = (e: React.MouseEvent) => {
    if (modalRef.current !== null && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const handleAnimationEnd = () => {
    if (isFadeout) {
      onClosed();
    }
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return createPortal(
    <ModalStyle
      className={isFadeout ? "fade-out" : "fade-in"}
      onClick={handleOverlay}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="modal-body" ref={modalRef}>
        <div className="modal-contents">{children}</div>
        <button className="modal-close" onClick={handleClose}>
          <IoClose />
        </button>
      </div>
    </ModalStyle>,
    document.body,
  );
};

const ModalStyle = styled.div`
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

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.6);

  .modal-body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 5rem 2rem 2rem;
    background-color: #ffffff;
    box-shadow: ${({ theme }) => theme.borderShadow.itemShadow};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    max-width: 60%;
  }

  .modal-close {
    border: none;
    background-color: transparent;
    cursor: pointer;

    position: absolute;
    top: 0;
    right: 0;
    padding: 1rem;

    svg {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
`;

export default Modal;
