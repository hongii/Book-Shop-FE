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

  /* html {
    font-size: 1vw;
  } */

  body{
    padding: 0;
    margin: 0;
    background-color:  ${(props) => (props.themeName === "light" ? "white" : "#121212")};
  }

  h1 {
    font-size: 2rem;
    margin: 0;
  }

  /* h2 {
    font-size:1.5rem;
    margin: 0;
  } */


  a {
    text-decoration: none;
    color: inherit;
  }

  svg, path{
    color: inherit;
  }
`;
