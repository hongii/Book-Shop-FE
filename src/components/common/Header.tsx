import styled from "styled-components";
import logoLight from "@/assets/images/logo_light.png";
import logoDark from "@/assets/images/logo_dark.png";
import { FaSignInAlt } from "@react-icons/all-files/fa/FaSignInAlt";
import { FaSignOutAlt } from "@react-icons/all-files/fa/FaSignOutAlt";
import { FaRegUser } from "@react-icons/all-files/fa/FaRegUser";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";
import { IoCartOutline } from "@react-icons/all-files/io5/IoCartOutline";
import { IoList } from "@react-icons/all-files/io5/IoList";
import ThemeSwitcher from "@/components/header/ThemeSwitcher";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { logout } from "@/api/auth.api";
import { useAlert } from "@/hooks/useAlert";
import Dropdown from "@/components/common/Dropdown";
import { useCategory } from "@/hooks/useCategory";
import Category from "@/components/category/Category";

const Header = () => {
  const { themeName } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { isLoggedIn, storeLogout } = useAuthStore();
  const { categories, isCategoriesLoading } = useCategory();
  const { showAlert } = useAlert();

  const handleLogout = async () => {
    const { message } = await logout();
    storeLogout();
    showAlert(message);
    navigate("/");
  };

  if (isCategoriesLoading || !categories) {
    return null;
  }
  return (
    <HeaderStyle>
      <div className="logo-category">
        <Link to="/">
          <h1 className="logo">
            <img src={themeName === "light" ? logoLight : logoDark} alt="book shop logo" />
            <span>HONG'S BOOK</span>
          </h1>
        </Link>

        <Dropdown toggleButtonIcon={<IoList />}>
          <Category />
        </Dropdown>
      </div>

      <div className="auth-themeswitcher">
        {isLoggedIn && (
          <nav className="auth">
            <Dropdown toggleButtonIcon={<FaUserCircle />}>
              <ul>
                <li className="auth-link">
                  <Link to="/carts">
                    <IoCartOutline />
                    &nbsp;장바구니
                  </Link>
                </li>
                <li className="auth-link">
                  <Link to="/orderlist">
                    <FaRegUser /> &nbsp;주문내역
                  </Link>
                </li>
                <li className="auth-link">
                  <button className="logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt /> &nbsp;로그아웃
                  </button>
                </li>
              </ul>
            </Dropdown>
          </nav>
        )}

        {!isLoggedIn && (
          <nav className="no-auth">
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
        )}
        <ThemeSwitcher />
      </div>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.header`
  width: 100%;
  margin: 0 auto;
  /* max-width: ${({ theme }) => theme.layout.width.large}; */
  background-color: ${({ theme }) => theme.color.background};
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};

  .logo-category {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
  }

  .dropdown-list-btn {
    padding: 0.15rem 0.1rem 0.1rem 0.15rem;
    display: flex;
    font-size: 2rem;
    border: 1px solid ${({ theme }) => theme.color.authIconColor};
    background: none;
    border-radius: 50%;
    cursor: pointer;

    svg {
      fill: ${({ theme }) => theme.color.authIconColor};
    }

    &:hover {
      opacity: 0.8;
    }
  }

  .logo {
    color: ${({ theme }) => theme.color.text};
    display: flex;
    align-items: center;
    cursor: pointer;
    white-space: nowrap;

    img {
      max-width: 60px;
      height: auto;
      margin-right: 5px;
    }

    span {
      font-family: "McLaren", sans-serif;
    }
  }

  .auth-themeswitcher {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .auth {
    white-space: nowrap;
    ul {
      margin: 0;
    }
    a {
      padding: 0.8rem;
      display: block;
      &:hover {
        opacity: 0.8;
      }
    }

    .auth-link,
    .logout-btn {
      width: 100%;
      font-size: 1.3rem;
      font-weight: 600;
      color: ${({ theme }) => theme.color.text};
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      height: 100%;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }

      .logout-btn {
        padding: 0.8rem;
        border-radius: 8px;
        border: none;
        background-color: transparent;
      }
    }
  }

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
      font-size: 1.3rem;
      font-weight: 600;
      color: ${({ theme }) => theme.color.text};

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export default Header;
