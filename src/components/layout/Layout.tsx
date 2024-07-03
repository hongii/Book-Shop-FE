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
  padding: 1.8rem 1.5rem;

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    max-width: 1200px;
  }
`;

export default Layout;
