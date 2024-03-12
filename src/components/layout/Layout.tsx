import Header from "../common/Header";
import Footer from "../common/Footer";
import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <WrapperStyle>
      <Header />
      <LayoutStyle>{children}</LayoutStyle>
      <Footer />
    </WrapperStyle>
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
  margin: 0 auto;
`;

export default Layout;
