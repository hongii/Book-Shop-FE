import styled from "styled-components";
import logoLight from "@/assets/images/logo_light.png";
import logoDark from "@/assets/images/logo_dark.png";
import { IoList } from "@react-icons/all-files/io5/IoList";
import ThemeSwitcher from "@/components/header/ThemeSwitcher";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Dropdown from "@/components/common/Dropdown";
import { useCategory } from "@/hooks/useCategory";
import Category from "@/components/category/Category";
import AuthHeader from "@/components/header/AuthHeader";
import UnAuthHeader from "@/components/header/UnAuthHeader";

const Header = () => {
  const { themeName } = useContext(ThemeContext);
  const { isLoggedIn } = useAuthStore();
  const { categories, isCategoriesLoading } = useCategory();

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
        {isLoggedIn && <AuthHeader />}
        {!isLoggedIn && <UnAuthHeader />}
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
`;

export default Header;
