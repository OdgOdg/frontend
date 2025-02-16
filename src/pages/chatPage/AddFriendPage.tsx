import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";
import EmailInput from "../../components/chatPage/EmailInput";
import searchCardImg from "../../images/chatPage/CardSearch.jpg";
import styled from "styled-components";

const AddFriendPage = () => {
  return (
    <>
      <Header title="친구 추가" />
      <EmailInput />
      <ImageContainer>
        <Image src={searchCardImg} alt="searchCardImg" />
      </ImageContainer>
      <BottomNavbar />
    </>
  );
};

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 세로 중앙 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
  height: 100vh; /* 화면 전체 높이 */
`;

const Image = styled.img`
  width: 40%; /* 이미지의 가로 크기를 부모 컨테이너에 맞게 설정 */
  height: auto; /* 이미지의 비율을 유지하면서 세로 크기 자동 조정 */
  max-width: 500px; /* 이미지의 최대 가로 크기를 설정 */
`;

export default AddFriendPage;
