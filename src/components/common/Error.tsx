import styled from "styled-components";
import { IoHomeOutline } from "@react-icons/all-files/io5/IoHomeOutline";
import error from "@/assets/images/error.png";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <ErrorStyle>
      <img src={error} alt="error" />
      <h2 className="error-title">길을 잃으셨나요?</h2>
      <p className="error-content">
        죄송합니다. 해당 페이지를 찾을 수 없습니다. <br />
        아래 버튼을 클릭하여 홈페이지로 이동해주세요.
      </p>

      <HomeButton>
        <Link to={"/"}>
          <IoHomeOutline size={28} />
          &nbsp; 홈페이지 바로가기
        </Link>
      </HomeButton>
    </ErrorStyle>
  );
};

const ErrorStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  .error-title {
    font-size: 2.2rem;
  }

  .error-content {
    font-size: 1.8rem;
  }
`;

const HomeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 5px;
  cursor: pointer;
  background-color: transparent; /* 배경색을 투명으로 설정 */

  a {
    text-decoration: none;
  }
`;
export default Error;
