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
    gap: 1rem;
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
    justify-content: flex-end;
    gap: 1rem;
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    .logo {
      font-size: 3rem;

      img {
        max-width: 45px;
      }
    }
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    .logo {
      font-size: 2.5rem;

      img {
        max-width: 60px;
      }
    }
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    .logo {
      font-size: 2.2rem;

      img {
        max-width: 70px;
      }
    }
  }
`;

export default Header;
