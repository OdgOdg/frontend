import React from "react";
import styled from "styled-components";
import { IoSettingsSharp } from "react-icons/io5";
import DefaultProfileImg from "../../images/MyPage/DefaultProfileImg.png";
import 송도센트럴파크 from "../../images/MyPage/송도센트럴파크.jpg";
import 월미도 from "../../images/MyPage/월미도.jpg";
import 개항장 from "../../images/MyPage/개항장.jpg";
import 차이나타운 from "../../images/MyPage/차이나타운.jpg";
import 계양산 from "../../images/MyPage/계양산.jpg";
import 을왕리해수욕장 from "../../images/MyPage/을왕리해수욕장.jpg";
import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";

/* styled-components */

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const SettingsIconButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  object-fit: cover;
  margin-bottom: 8px;
`;

const UserName = styled.h2`
  font-size: 18px;
  margin: 8px 0 4px 0;
`;

const UserDescription = styled.p`
  font-size: 14px;
  color: #666666;
  margin: 0 0 16px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 30px;
`;

const Button = styled.button`
  flex: 1;
  width: 150px;
  padding: 8px 10px;
  font-size: 14px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: #00aa5b;
  color: #ffffff;
  &:hover {
    opacity: 0.9;
  }
`;

const PhotoGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  padding: 16px;
`;

const PhotoItem = styled.div`
  position: relative;
  width: 100%;
`;

const PhotoImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  display: block;
`;

const PhotoLabel = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 12px;
  color: #fff;
  font-weight: 500;
  background: rgba(36, 36, 36, 0.5);
  padding: 2px 0;
`;

const ProfileManagementButton = styled.button`
  width: 60%;
  margin: 12px auto;
  padding: 12px;
  border: none;
  background-color: #00aa5b;
  color: white;
  border-radius: 100px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  &:hover {
    opacity: 0.9;
  }
`;

/* ------------------------- Component & Types ------------------------- */

const MyProfile: React.FC = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        alert("로그아웃 성공!");
        window.location.replace("/login"); // 새로고침하면서 로그인 페이지로 이동
      } else {
        alert("로그아웃 실패");
      }
    } catch (error) {
      console.error("로그아웃 오류:", error);
      alert("로그아웃 중 오류 발생");
    }
  };

  return (
    <>
      <Header title="마이페이지" />
      <Container>
        <SettingsIconButton>
          <IoSettingsSharp size={24} color="#000" />
        </SettingsIconButton>

        <ProfileSection>
          <ProfileImage src={DefaultProfileImg} alt="" />
          <UserName>김지훈</UserName>
          <UserDescription>여행을 좋아하는 김지훈입니다.</UserDescription>
          <ButtonGroup>
            <Button>친구추가</Button>
            <Button>메시지 보내기</Button>
          </ButtonGroup>
        </ProfileSection>

        <PhotoGrid>
          <PhotoItem>
            <PhotoImage src={송도센트럴파크} alt="송도 센트럴파크" />
            <PhotoLabel>송도 센트럴파크</PhotoLabel>
          </PhotoItem>
          <PhotoItem>
            <PhotoImage src={월미도} alt="월미도" />
            <PhotoLabel>월미도</PhotoLabel>
          </PhotoItem>
          <PhotoItem>
            <PhotoImage src={개항장} alt="인천 개항장" />
            <PhotoLabel>인천 개항장</PhotoLabel>
          </PhotoItem>
          <PhotoItem>
            <PhotoImage src={차이나타운} alt="차이나타운" />
            <PhotoLabel>차이나타운</PhotoLabel>
          </PhotoItem>
          <PhotoItem>
            <PhotoImage src={계양산} alt="계양산" />
            <PhotoLabel>계양산</PhotoLabel>
          </PhotoItem>
          <PhotoItem>
            <PhotoImage src={을왕리해수욕장} alt="을왕리 해수욕장" />
            <PhotoLabel>을왕리 해수욕장</PhotoLabel>
          </PhotoItem>
        </PhotoGrid>

        <ProfileManagementButton>프로필 관리</ProfileManagementButton>
        <ProfileManagementButton onClick={handleLogout}>로그아웃</ProfileManagementButton>
      </Container>
      <BottomNavbar paddingBottom={false} />
    </>
  );
};

export default MyProfile;
