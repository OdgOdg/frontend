import React, { useState } from "react";
import styled from "styled-components";

// Props 인터페이스 정의
interface ShowProfileProps {
  name: string;
  email: string;
  imageUrl: string;
}

// FindFriend 컴포넌트 정의 (타입 적용)
const ShowProfile: React.FC<ShowProfileProps> = ({ name, email, imageUrl }) => {
  const [imageError, setImageError] = useState(false); // 이미지 오류 상태

  const handleError = () => {
    setImageError(true); // 이미지 오류 발생 시 상태 업데이트
  };

  return (
    <ShowProfileCard>
      <ImageWrapper>
        {imageError ? (
          <FallbackText>{name}의 프로필 이미지 없음</FallbackText>
        ) : (
          <ProfileImage src={imageUrl} alt={`${name} 프로필 이미지`} onError={handleError} />
        )}
      </ImageWrapper>
      <Name>{name}</Name>
      <Email>{email}</Email>
      <AddFriendButton>친구 추가</AddFriendButton>
    </ShowProfileCard>
  );
};

const FindFriend = () => {
  return (
    <div>
      <ShowProfile
        name="김지훈"
        email="20201532@inu.ac.kr"
        imageUrl="https://via.placeholder.com/100" // 실제 이미지 URL로 변경
      />
    </div>
  );
};

const ShowProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  background-color: #eee; /* 이미지 없을 때 대체 배경색 */
  border-radius: 50%;
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const FallbackText = styled.p`
  font-size: 14px;
  color: #686a8a;
  text-align: center; /* 텍스트 중앙 정렬 */
  margin: 0;
`;

const Name = styled.h2`
  font-size: 24px;
  margin-bottom: 5px;
`;

const Email = styled.p`
  font-size: 18px;
  color: #686a8a;
`;

const AddFriendButton = styled.button`
  font-size: 18px;
  padding: 8px 64px;
  background-color: #00aa5b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default FindFriend;
