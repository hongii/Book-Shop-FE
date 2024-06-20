import styled from "styled-components";
import { IoArrowUp } from "@react-icons/all-files/io5/IoArrowUp";

const TopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <TopButtonStyle>
      <button className="top-btn" onClick={handleScrollToTop}>
        <IoArrowUp />
      </button>
    </TopButtonStyle>
  );
};

const TopButtonStyle = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;

  .top-btn {
    z-index: 100;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: none;
    background-color: ${({ theme }) => theme.color.third};
    cursor: pointer;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);

    svg {
      width: 28px;
      height: 28px;
      fill: #fff;
      color: #fff;
    }
  }
`;

export default TopButton;
