import styled from "styled-components";
import { FaSpinner } from "@react-icons/all-files/fa/FaSpinner";

const Loading = () => {
  return (
    <LoadingStyle>
      <FaSpinner />
    </LoadingStyle>
  );
};

const LoadingStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.width.large};
  margin: 0 auto;
  padding: 5rem 0;

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  svg {
    width: 70px;
    height: 70px;
    fill: #ececec;
    animation: rotate 1s cubic-bezier(0.06, 0.08, 0.1, 1) infinite;
  }
`;

export default Loading;
