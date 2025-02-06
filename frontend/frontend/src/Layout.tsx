import { ReactNode } from "react";
import styled from "styled-components";

const Layout = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  width: 100%;
  max-width: 576px;
  min-height: 100vh;
  margin-left: auto;
  margin-right: auto;
  overflow-x: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export default Layout;
