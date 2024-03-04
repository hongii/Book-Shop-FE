import styled from "styled-components";
import logoLight from "../../assets/images/logo_light.png";
import logoDark from "../../assets/images/logo_dark.png";
import { FaSignInAlt } from "@react-icons/all-files/fa/FaSignInAlt";
import { FaSignOutAlt } from "@react-icons/all-files/fa/FaSignOutAlt";
import { FaRegUser } from "@react-icons/all-files/fa/FaRegUser";
import { IoCartOutline } from "@react-icons/all-files/io5/IoCartOutline";
import { BsList } from "@react-icons/all-files/bs/BsList";
import ThemeSwitcher from "../header/ThemeSwitcher";
import { useContext, useRef, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { logout } from "../../api/auth.api";
import { useAlert } from "../../hooks/useAlert";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import ListModal from "../category/ListModal";

const Header = () => {
  const { themeName } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { isLoggedIn, storeLogout } = useAuthStore();
  const showAlert = useAlert();

  const ref = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  useOnClickOutside(ref, () => {
    setModalOpen(false);
  });

  const handleLogout = async () => {
    const { message } = await logout();
    storeLogout();
    showAlert(message);
    navigate("/");
  };

  return (
    <HeaderStyle>
      <div className="logo-category">
        <Link to="/">
          <h1 className="logo">
            <img src={themeName === "light" ? logoLight : logoDark} alt="book shop logo" />
            <span>HONG'S BOOK</span>
          </h1>
        </Link>

        <button
          className="dropdown-list-btn"
          ref={ref}
          onClick={() => setModalOpen((prev) => !prev)}
        >
          <BsList />
        </button>
        {modalOpen && <ListModal />}
      </div>

      <div className="auth-themeswitcher">
        <nav className="auth">
          {isLoggedIn && (
            <ul>
              <li>
                <Link to="/cart">
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
  }

  .dropdown-list-btn {
    padding: 5px;
    display: flex;
    margin-left: 1.2rem;
    font-size: 2rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: 50%;
    background-color: ${({ theme }) => theme.buttonScheme.normal.backgroundColor};
    cursor: pointer;

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
  }

  .auth {
    ul {
      display: flex;
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
// color  #FFF1F6
// light 모드 글자색 #423E3A
