import React from "react";
import styled from "styled-components";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <NavBar>
      <BackButton onClick={() => window.history.back()}>{`<`}</BackButton>
      <Title>{title}</Title>
    </NavBar>
  );
};

export default Header;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-color: white;
  border-bottom: 1px solid #ddd;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
`;

const BackButton = styled.button`
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  left: 16px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
`;
