import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styled from "styled-components";
import { IoInvertMode } from "@react-icons/all-files/io5/IoInvertMode";

const ThemeSwitcher = () => {
  const { themeName, toggleTheme } = useContext(ThemeContext);

  return (
    <IconButton onClick={toggleTheme}>
      <IoInvertMode size={28} />
      &nbsp;{themeName}
    </IconButton>
  );
};

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 70px;
  /* height: 30px; */
  border: none;
  cursor: pointer;
  background-color: transparent; /* 배경색을 투명으로 설정 */

  &:hover {
    opacity: 0.8;
  }
`;

export default ThemeSwitcher;
