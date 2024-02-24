import styled from "styled-components";
import logo from "../../assets/images/logoImg_white.png";

const Footer = () => {
  return (
    <FooterStyle>
      <h2 className="logo">
        <img src={logo} alt="book shop logo" />
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
  padding: 10px;
  border-top: 2px solid ${({ theme }) => theme.color.border};

  display: flex;
  align-items: center;
  justify-content: center;

  .logo {
    padding-right: 30px;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.color.text};

    img {
      width: 40px;
    }
  }

  .copyright {
    p {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.color.text};
    }
  }
`;

export default Footer;
