import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import styled from "styled-components";
import { IoMdMoon } from "@react-icons/all-files/io/IoMdMoon";
import { IoSunny } from "@react-icons/all-files/io5/IoSunny";
import { useMediaQuery } from "@/hooks/useMediaQuery";
const ThemeSwitcher = () => {
  const { themeName, toggleTheme } = useContext(ThemeContext);
  const { isMobile } = useMediaQuery();

  return (
    <IconButton onClick={toggleTheme}>
      {themeName === "light" ? <IoSunny /> : <IoMdMoon />}
      {!isMobile && <span>&nbsp;{themeName}</span>}
    </IconButton>
  );
};

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0;
  border: none;
  cursor: pointer;
  background-color: transparent; /* 배경색을 투명으로 설정 */

  svg {
    width: 2.4rem;
    height: 2.4rem;
    fill: ${({ theme }) => theme.color.themeIconColor};
  }

  span {
    font-size: 1.3rem;
    color: ${({ theme }) => theme.color.themeIconColor};
  }

  &:hover {
    opacity: 0.8;
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    svg,
    path,
    circle {
      width: 3.7rem;
      height: 3.7rem;
    }

    span {
      font-size: 2rem;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    span {
      font-size: 1.8rem;
    }
  }
`;

export default ThemeSwitcher;
