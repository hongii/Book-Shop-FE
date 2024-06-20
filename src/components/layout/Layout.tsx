import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import styled from "styled-components";
import TopButton from "../common/TopButton";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <WrapperStyle>
        <Header />
        <LayoutStyle>{children}</LayoutStyle>
        <Footer />
      </WrapperStyle>
      <TopButton />
    </>
  );
};
const WrapperStyle = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const LayoutStyle = styled.main`
  width: 100%;
  flex: 1;
  margin: 70px auto;

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 1.8rem 1.5rem;
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    padding: 1.8rem 1.5rem;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    max-width: 70vw;
  }
`;

export default Layout;
