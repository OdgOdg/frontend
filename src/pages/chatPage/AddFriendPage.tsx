import React, { useState } from "react";
import styled from "styled-components";
import { FiUserPlus } from "react-icons/fi";
import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";
import searchCardImg from "../../images/chatPage/CardSearch.jpg";
import profileImg from "../../images/chatPage/JihoonProfile.png"; // 김지훈 프로필 이미지 추가

const AddFriendPage = () => {
  const [email, setEmail] = useState(""); // 입력 값 상태 추가
  const [isMatched, setIsMatched] = useState(false); // 일치 여부 상태

  const handleChange = (value: string) => {
    setEmail(value);
    if (value === "20201532@inu.ac.kr") {
      setIsMatched(true);
    } else {
      setIsMatched(false);
    }
  };

  return (
    <>
      <Header title="친구 추가" />
      <EmailInput value={email} onChange={handleChange} />
      {isMatched ? (
        <Profile />
      ) : (
        <ImageContainer>
          <Image src={searchCardImg} alt="searchCardImg" />
        </ImageContainer>
      )}
      <BottomNavbar />
    </>
  );
};

const EmailInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <InputWrapper>
      <StyledInput placeholder="이메일을 입력해 주세요" value={value} onChange={(e) => onChange(e.target.value)} />
      <SearchButton>
        <FiUserPlus size={24} />
      </SearchButton>
    </InputWrapper>
  );
};

const Profile = () => (
  <ProfileContainer>
    <ProfileImage src={profileImg} alt="김지훈 프로필" />
    <ProfileName>김지훈</ProfileName>
    <ProfileEmail>20201532@inu.ac.kr</ProfileEmail>
    <AddFriendButton>친구 추가</AddFriendButton>
  </ProfileContainer>
);

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Image = styled.img`
  width: 40%;
  height: auto;
  max-width: 500px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 300px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 20px;
  background-color: white;
  margin: 5% auto 0;
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #6b7280;
  background: transparent;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200px;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;

const ProfileName = styled.h2`
  margin-top: 10px;
  font-size: 18px;
  color: #333;
`;

const ProfileEmail = styled.p`
  font-size: 14px;
  color: #666;
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

export default AddFriendPage;
