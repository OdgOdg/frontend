import styled from "styled-components";

const MainPage = () => {
  return <StyledButton>MainPage</StyledButton>;
};

const StyledButton = styled.button`
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
  }
`;
export default MainPage;
