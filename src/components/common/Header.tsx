import styled from "styled-components";
import logoLight from "../../assets/images/logo_light.png";
import logoDark from "../../assets/images/logo_dark.png";
import { FaSignInAlt } from "@react-icons/all-files/fa/FaSignInAlt";
import { FaRegUser } from "@react-icons/all-files/fa/FaRegUser";
import ThemeSwitcher from "../header/ThemeSwitcher";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import { useCategory } from "../../hooks/useCategory";

const Header = () => {
  const { themeName } = useContext(ThemeContext);
  const { category } = useCategory();

  return (
    <HeaderStyle>
      <Link to="/">
        <h1 className="logo">
          <img src={themeName === "light" ? logoLight : logoDark} alt="book shop logo" />
          HONG'S BOOK
        </h1>
      </Link>
      <nav className="category">
        <ul>
          {category.map((item) => {
            return (
              <li key={item.categoryId}>
                <Link
                  to={`/books${item.categoryId !== null ? `?category_id=${item.categoryId}` : ""}`}
                >
                  {item.categoryName}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <nav className="auth">
        <ul>
          <li>
            <Link to="/login">
              <FaSignInAlt />
              &nbsp;로그인
            </Link>
          </li>
          <li>
            <Link to="/join">
              <FaRegUser /> &nbsp;회원가입
            </Link>
          </li>
        </ul>
      </nav>
      <ThemeSwitcher />
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

  a {
    text-decoration: none;
  }

  .logo {
    font-family: "McLaren", sans-serif;
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
    li {
      a {
        font-size: 1rem;
        font-weight: 600;
        color: ${({ theme }) => theme.color.text};
        display: flex;
        align-items: center;
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export default Header;
// color  #FFF1F6
// light 모드 글자색 #423E3A
