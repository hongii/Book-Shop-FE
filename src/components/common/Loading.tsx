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
  padding: 30rem;
  text-align: center;

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
