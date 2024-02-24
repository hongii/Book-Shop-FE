import styled from "styled-components";
import logo from "../../assets/images/logoImg.png";
import { FaSignInAlt } from "@react-icons/all-files/fa/FaSignInAlt";
import { FaRegUser } from "@react-icons/all-files/fa/FaRegUser";
// import ThemeSwitcher from "../header/ThemeSwitcher";

const categories = [
  {
    id: null,
    name: "전체",
  },
  {
    id: 0,
    name: "동화",
  },
  {
    id: 1,
    name: "소설",
  },
  {
    id: 2,
    name: "사회",
  },
];

const Header = () => {
  return (
    <HeaderStyle>
      <h1 className="logo">
        <img src={logo} alt="book shop logo" />
        HONG'S BOOK
      </h1>
      <nav className="category">
        <ul>
          {categories.map((item) => {
            return (
              <li key={item.id}>
                <a href={`/books${item.id !== null ? `?category_id=${item.id}` : ""}`}>
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <nav className="auth">
        <ul>
          <li>
            <a href="/login">
              <FaSignInAlt />
              &nbsp;로그인
            </a>
          </li>
          <li>
            <a href="/register">
              <FaRegUser /> &nbsp;회원가입
            </a>
          </li>
        </ul>
      </nav>
      {/* <ThemeSwitcher /> */}
    </HeaderStyle>
  );
};

const HeaderStyle = styled.header`
  width: 100%;
  margin: 0 auto;
  /* max-width: ${({ theme }) => theme.layout.width.large}; */
  background-color: ${({ theme }) => theme.color.background};
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};

  .logo {
    color: ${({ theme }) => theme.color.text};
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      width: 80px;
      margin-right: 5px;
    }
  }

  .category {
    ul {
      display: flex;
      gap: 32px;
    }
    li a {
      text-decoration: none;
      font-size: 1.3rem;
      font-weight: 600;
      color: ${({ theme }) => theme.color.text};

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .auth {
    ul {
      display: flex;
      gap: 16px;
    }
    li a {
      text-decoration: none;
      font-size: 1rem;
      font-weight: 600;
      color: ${({ theme }) => theme.color.text};
      display: flex;
      align-items: center;

      &:hover {
        color: ${({ theme }) => theme.color.primary};
      }
    }
  }
`;

export default Header;
// color  #FFF1F6
// light 모드 글자색 #423E3A
