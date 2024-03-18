import styled from "styled-components";
import logoWhite from "../../assets/images/logo_white.png";
import logoDark from "../../assets/images/logo_dark_footer.png";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Footer = () => {
  const { themeName } = useContext(ThemeContext);

  return (
    <FooterStyle>
      <h2 className="logo">
        <img src={themeName === "light" ? logoWhite : logoDark} alt="book shop logo" />
        HONG'S BOOK
      </h2>
      <div className="copyright">
        <p>copyright(c) 2024, Hong's Book.</p>
      </div>
    </FooterStyle>
  );
};

const FooterStyle = styled.footer`
  width: 100%;
  margin: 0 auto;
  /* max-width: ${({ theme }) => theme.layout.width.large}; */
  padding: 1rem;
  border-top: 2px solid ${({ theme }) => theme.color.border};

  display: flex;
  align-items: center;
  justify-content: center;

  .logo {
    font-family: "McLaren", sans-serif;
    font-size: 1.5rem;
    padding-right: 30px;
    color: ${({ theme }) => theme.color.text};

    img {
      width: 40px;
      margin-right: 5px;
    }
  }

  .copyright {
    p {
      font-size: 1rem;
      color: ${({ theme }) => theme.color.text};
    }
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    flex-direction: column;
    align-items: center;
    padding: 5rem;

    .logo {
      font-size: 3rem;
      padding: 0;
    }
    .copyright {
      p {
        font-size: 2rem;
      }
    }
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    flex-direction: column;
    align-items: center;
    padding: 5rem;

    .logo {
      font-size: 2.5rem;
      padding: 0;
    }
    .copyright {
      p {
        font-size: 1.8rem;
      }
    }
  }
`;

export default Footer;
