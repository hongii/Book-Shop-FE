import { createGlobalStyle } from "styled-components";
import "sanitize.css"; // global css로 sanitize.css를 적용
import { ThemeName } from "./theme";

interface Props {
  themeName: ThemeName;
}

// 프로젝트에 적용할 global style
export const GlobalStyle = createGlobalStyle<Props>`
  * {
    font-family: "Poor Story", "Montserrat", sans-serif;
    color: ${(props) => (props.themeName === "light" ? "black" : "white")};
  }

  body {
    padding: 0;
    margin: 0;
    background-color:  ${(props) => (props.themeName === "light" ? "white" : "#121212")};
  }

  h1 {
    font-size: 1.7rem;
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

  svg, path {
    color: inherit;
  }

  li {
    list-style: none;
  }



  @media (min-width: 0) and (max-width: 425px){
    html {
      font-size: 1.5vw;
    }
  }

  @media (min-width: 426px) and (max-width: 639px){
    html {
      font-size: 1.25vw;
    }
  }

  @media (min-width: 640px) and (max-width: 1023px){
    html {
      font-size: 1.1vw;
    }
  }

  @media (min-width: 1024px) and (max-width: 1300px){
    html {
      font-size: 0.9vw;
    }
  }

  @media (min-width: 1301px)and (max-width: 1600px) {
    html {
      font-size: 0.75vw;
    }
  }

  @media (min-width: 1601px) {
    html {
      font-size: 0.65vw;
    }
  }
`;
