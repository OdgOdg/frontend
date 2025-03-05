import styled from "styled-components";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";

const LanguageSelectionPage = () => {
  return (
    <div>
      <Header title="언어" />
      <LanguageContainer>
        <LanguageItem>
          <img src="https://flagcdn.com/w40/kr.png" alt="Korean Flag" /> 한국어
        </LanguageItem>
        <LanguageItem>
          <img src="https://flagcdn.com/w40/us.png" alt="US Flag" /> English (US)
        </LanguageItem>
      </LanguageContainer>
      <BottomNavbar paddingBottom={false} />
    </div>
  );
};

const LanguageContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  /* height: 100vh; */
`;

const LanguageItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  margin: 50px 0;
  cursor: pointer;
  img {
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }
`;

export default LanguageSelectionPage;
