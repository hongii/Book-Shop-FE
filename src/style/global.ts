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

  svg, path{
    color: inherit;
  }

  @media (min-width: 0) and (max-width: 600px){
    html {
      font-size: 1.6vw;
    }
  }

  @media (min-width: 600px) and (max-width: 900px){
    html {
      font-size: 1.4vw;
    }
  }

  @media (min-width: 900px) and (max-width: 1080px){
    html {
      font-size: 1.2vw;
    }
  }

  @media (min-width: 1080px) and (max-width: 1300px){
    html {
      font-size: 1vw;
    }
  }

  @media (min-width: 1300px)and (max-width: 1600px) {
    html {
      font-size: 0.85vw;
    }
  }

  @media (min-width: 1600px) {
    html {
      font-size: 0.75vw;
    }
  }

  /* @media screen and (min-width: 0) and (max-width: 480px) and (max-aspect-ratio: 4 / 3){
    body, html {
      font-size: 1.5vw;
    }
  }

  @media screen and (min-width: 481px) and (max-width: 840px) and (max-aspect-ratio: 4 / 3) {
    body, html {
      font-size: 1vw;
    }
  }
  
  @media screen and (min-width: 841px) and (max-width: 1280px) and (orientation: landscape){
    body, html {
      font-size: .85vw;
    }
  }
  @media screen and (min-width: 841px) and (max-width: 1280px) and (max-aspect-ratio: 4 / 3){
    body, html {
      font-size: .75vw;
    }
  }

  @media screen and (min-width: 1281px) and (max-width: 1600px) and (orientation: landscape){
    body, html {
      font-size: .75vw;
    }
  }

  @media screen and (min-width: 1601px) and (max-width: 1920px) and (orientation: landscape){
    body, html {
      font-size: .75vw;
    }
  }

  @media screen and (min-width: 1921px) and (orientation: landscape){
    body, html {
      font-size: 14px;
    } 
  } */
`;
