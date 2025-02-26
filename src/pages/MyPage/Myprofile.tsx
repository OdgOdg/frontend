// MyPage.tsx
import React from 'react';
import styled from 'styled-components';
import { IoSettingsSharp } from 'react-icons/io5';
import DefaultProfileImg from '../../images/MyPage/DefaultProfileImg.png'
import ProfileImg from '../../images/MyPage/ProfileImg.jpg';
import 송도센트럴파크 from '../../images/MyPage/송도센트럴파크.jpg';
import 월미도 from '../../images/MyPage/월미도.jpg';
import 개항장 from '../../images/MyPage/개항장.jpg';
import 차이나타운 from '../../images/MyPage/차이나타운.jpg';
import 계양산 from '../../images/MyPage/계양산.jpg';
import 을왕리해수욕장 from '../../images/MyPage/을왕리해수욕장.jpg';
import BottomNavbar from "../../components/BottomNavbar"
import Header from "../../components/Header"

// 전체 컨테이너 (position: relative 추가)
const Container = styled.div`
  width: 100%;
  max-width: 400px; /* 모바일 기준 가로 폭 예시 */
  margin: 0 auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

// Settings 아이콘 컨테이너 (Header 아래, Container 오른쪽 상단)
const SettingsIconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const SettingsIconButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;


// 프로필 섹션
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
  gap: 50px;
`;

const ActionButton = styled.button`
  flex: 1;
  width: 150px;
  padding: 6px 10px;
  font-size: 14px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: #00AA5B;
  color: #ffffff;
`;

// 사진 그리드
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
  bottom: 0; /* 이미지 하단에서 약간의 여백 */
  left: 0;
  right: 0;
  text-align: center;
  font-size: 12px;
  color: #fff;
  font-weight: 500;
  background: rgba(36, 36, 36, 0.5); /* 필요시 배경을 어둡게 하여 가독성 향상 */
  padding: 2px 0;
`;

// 프로필 관리 버튼
const ProfileManagementButton = styled.button`
  width: 200px;
  margin: 12px auto;
  padding: 10px 20px;
  border: none;
  background-color: #00AA5B;
  color: white;
  border-radius: 100px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
`;

// 메인 컴포넌트
const MyProfile: React.FC = () => {
  return (
    <>
      <Container>
        <Header title="마이페이지" />
        {/* Header 아래에 오른쪽 상단 Settings 아이콘 */}
        <SettingsIconButton>
          <IoSettingsSharp size={24} color="#000" />
        </SettingsIconButton>

        {/* 프로필 영역 */}
        <ProfileSection>
          <ProfileImage src={DefaultProfileImg} alt="" />
          <UserName>김지훈</UserName>
          <UserDescription>여행을 좋아하는 김지훈입니다.</UserDescription>
          <ButtonGroup>
            <ActionButton>친구추가</ActionButton>
            <ActionButton>메시지 보내기</ActionButton>
          </ButtonGroup>
        </ProfileSection>

        {/* 사진 그리드 */}
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

        {/* 프로필 관리 버튼 */}
        <ProfileManagementButton>프로필 관리</ProfileManagementButton>
        <BottomNavbar />
      </Container>
    </>

  );
};

export default MyProfile;
