import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import styled from "styled-components";
import { IoMdMoon } from "@react-icons/all-files/io/IoMdMoon";
import { IoSunny } from "@react-icons/all-files/io5/IoSunny";
const ThemeSwitcher = () => {
  const { themeName, toggleTheme } = useContext(ThemeContext);

  return (
    <IconButton onClick={toggleTheme}>
      {themeName === "light" ? <IoSunny /> : <IoMdMoon />}
      <span>&nbsp;{themeName}</span>
    </IconButton>
  );
};

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  cursor: pointer;
  width: 5rem;
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
`;

export default ThemeSwitcher;
