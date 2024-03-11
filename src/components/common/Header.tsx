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
        <nav className="auth">
          <Dropdown toggleButtonIcon={<FaUserCircle />}>
            {isLoggedIn && (
              <ul>
                <li>
                  <Link to="/carts">
                    <IoCartOutline />
                    &nbsp;장바구니
                  </Link>
                </li>
                <li>
                  <Link to="/orderlist">
                    <FaRegUser /> &nbsp;주문내역
                  </Link>
                </li>
                <li>
                  <button className="logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt /> &nbsp;로그아웃
                  </button>
                </li>
              </ul>
            )}
            {!isLoggedIn && (
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
            )}
          </Dropdown>
        </nav>
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
    ul {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 16px;
    }
    li {
      white-space: nowrap;

      a,
      .logout-btn {
        font-size: 1.3rem;
        font-weight: 600;
        color: ${({ theme }) => theme.color.text};
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &:hover {
        opacity: 0.8;
      }

      .logout-btn {
        background-color: transparent;
        border-radius: 8px;
        border: none;
        height: 100%;
        cursor: pointer;
      }
    }
  }
`;

export default Header;
