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
  
  html {
    font-size: 1.5vw;
    /* font-size: 10px; */
  }

  body{
    padding: 0;
    margin: 0;
    background-color:  ${(props) => (props.themeName === "light" ? "white" : "#121212")};
  }

  h1 {
    font-size: 1.75rem;
    margin: 0;
  }

  h2 {
    font-size:1.25rem;
    margin: 0;
  }


  a {
    text-decoration: none;
    color: inherit;
  }

  svg, path{
    color: inherit;
  }

  @media (min-width: 900px) and (max-width: 1200px){
    html {
      font-size: 1.2vw;
    }
  }

  @media (min-width: 1200px) and (max-width: 1420px){
    html {
      font-size: 1vw;
    }
  }

  @media (min-width: 1420px)and (max-width: 1600px) {
    html {
      font-size: 0.85vw;
    }
  }

  @media (min-width: 1600px) {
    html {
      font-size: 0.75vw;
    }
  }
`;
