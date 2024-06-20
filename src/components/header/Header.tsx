import styled from "styled-components";
import logoLight from "@/assets/images/logo_light.png";
import logoDark from "@/assets/images/logo_dark.png";
import { IoList } from "@react-icons/all-files/io5/IoList";
import { IoSearch } from "@react-icons/all-files/io5/IoSearch";
import ThemeSwitcher from "@/components/header/ThemeSwitcher";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Dropdown from "@/components/common/Dropdown";
import { useCategory } from "@/hooks/useCategory";
import Category from "@/components/category/Category";
import AuthHeader from "@/components/header/AuthHeader";
import UnAuthHeader from "@/components/header/UnAuthHeader";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const Header = () => {
  const { themeName } = useContext(ThemeContext);
  const { isMobile } = useMediaQuery();
  const { isLoggedIn } = useAuthStore();
  const { categories, isCategoriesLoading } = useCategory();
  const [searchValue, setSearchValue] = useState<string>("");
  const [params] = useSearchParams();

  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate("/");
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim() !== "") {
      navigate(`/books/search?query=${searchValue}`);
    }
  };

  const handleSearchClick = () => {
    if (searchValue.trim() !== "") {
      navigate(`/books/search?query=${searchValue}`);
    }
  };

  useEffect(() => {
    const query = params.get("query");
    query ? setSearchValue(query) : setSearchValue("");
  }, [params]);

  if (isCategoriesLoading || !categories) {
    return null;
  }

  return (
    <HeaderStyle>
      <header className="layout-header">
        <div className="logo-category">
          <h1 className="logo" onClick={handleClickLogo}>
            <img src={themeName === "light" ? logoLight : logoDark} alt="book shop logo" />
            <span>HONG'S BOOK</span>
          </h1>

          <Dropdown toggleButtonIcon={<IoList />}>
            <Category />
          </Dropdown>
        </div>

        {!isMobile && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="찾고자 하는 도서명 또는 저자를 검색하세요."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button type="submit" className="search-btn" onClick={handleSearchClick}>
              <IoSearch />
            </button>
          </div>
        )}

        <div className="auth-themeswitcher">
          {isLoggedIn && <AuthHeader />}
          {!isLoggedIn && <UnAuthHeader />}
          <ThemeSwitcher />
        </div>
      </header>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.header`
  position: relative;

  .layout-header {
    width: 100%;
    height: 70px;

    position: fixed;
    top: 0;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.color.background};
    padding: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
    z-index: 100;

    display: flex;
    align-items: center;
    justify-content: space-between;

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

    .search-bar {
      width: 300px;
      position: relative;

      input {
        border: 1px solid #e7e7e7;
        padding: 8px 12px;
        border-radius: 30px;
        width: 100%;
        color: ${({ theme }) =>
          theme.name === "light" ? theme.color.text : theme.color.inputText};
      }

      input:focus {
        outline: none;
      }

      .search-btn {
        position: absolute;
        width: 35px;
        height: 35px;
        border: none;
        background-color: transparent;
        top: 0;
        right: 10px;
        cursor: pointer;

        svg,
        path {
          width: 2rem;
          height: 2rem;
          fill: ${({ theme }) => theme.color.inputText};
        }
      }
    }

    .auth-themeswitcher {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;
    }
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
