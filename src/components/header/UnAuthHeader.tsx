import { FaRegUser } from "@react-icons/all-files/fa/FaRegUser";
import { FaSignInAlt } from "@react-icons/all-files/fa/FaSignInAlt";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UnAuthHeader = () => {
  return (
    <UnAuthHeaderStyle>
      <nav className="no-auth">
        <ul>
          <li>
            <Link to="/login">
              <FaSignInAlt />
              로그인
            </Link>
          </li>
          <li>
            <Link to="/join">
              <FaRegUser />
              회원가입
            </Link>
          </li>
        </ul>
      </nav>
    </UnAuthHeaderStyle>
  );
};

const UnAuthHeaderStyle = styled.div`
  .no-auth {
    ul {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
    li {
      color: ${({ theme }) => theme.color.text};
      text-align: center;
      white-space: nowrap;
      font-size: 1.4rem;
      font-weight: 600;
      color: ${({ theme }) => theme.color.text};

      &:hover {
        opacity: 0.8;
      }
    }
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    .no-auth {
      li {
        font-size: 2rem;
      }
    }
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    .no-auth {
      li {
        font-size: 1.6rem;
      }
    }
  }
`;

export default UnAuthHeader;
