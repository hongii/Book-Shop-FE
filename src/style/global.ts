import { createGlobalStyle } from "styled-components";
import "sanitize.css"; // global css로 sanitize.css를 적용
import { ThemeName } from "./theme";

interface Props {
  themeName: ThemeName;
}

// 프로젝트에 적용할 global style
export const GlobalStyle = createGlobalStyle<Props>`
  *{
    font-family: "Poor Story", "Montserrat", sans-serif;
    color: ${(props) => (props.themeName === "light" ? "black" : "white")};
  }

  body{
    padding: 0;
    margin: 0;
    background-color:  ${(props) => (props.themeName === "light" ? "white" : "#121212")};
  }

  h1{
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  svg, path{
    color: inherit;
  }
`;
