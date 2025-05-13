import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { FiUserPlus } from "react-icons/fi";
import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";
import searchCardImg from "../../images/chatPage/CardSearch.jpg";
import profileImg from "../../images/chatPage/JihoonProfile.png";

let debounceTimer: ReturnType<typeof setTimeout>;

const AddFriendPage = () => {
  const [email, setEmail] = useState("");
  const [friendData, setFriendData] = useState<{ id: number; name: string; email: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddFriend = async (friendId: number) => {
    try {
      await axios.post("/api/v1/friends", { friendId });
      alert("친구가 추가되었습니다!");
    } catch (err) {
      alert("친구 추가에 실패했습니다.");
    }
  };

  const handleChange = (value: string) => {
    setEmail(value);
    setFriendData(null);
    setError(null);
  };

  useEffect(() => {
    if (!email) return;

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      try {
        const response = await axios.get(`api/v1/friends/email?email=${email}`);
        if (response.data && response.data.email) {
          setFriendData(response.data);
          setError(null);
        } else {
          setFriendData(null);
          setError("사용자를 찾을 수 없습니다.");
        }
      } catch (err: any) {
        setFriendData(null);
        if (err.response?.status === 401) {
          setError("로그인이 필요한 서비스입니다.");
        } else {
          setError("사용자를 찾을 수 없습니다.");
        }
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [email]);

  return (
    <>
      <Header title="친구 추가" />
      <EmailInput value={email} onChange={handleChange} />
      {friendData ? (
        <Profile id={friendData.id} name={friendData.name} email={friendData.email} onAddFriend={handleAddFriend} />
      ) : (
        <ImageContainer>
          <Image src={searchCardImg} alt="searchCardImg" />
          {error && <ErrorText>{error}</ErrorText>}
        </ImageContainer>
      )}
      <BottomNavbar />
    </>
  );
};

// EmailInput 컴포넌트를 AddFriendPage 밖으로 이동
const EmailInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <InputWrapper>
      <StyledInput placeholder="이메일을 입력해 주세요" value={value} onChange={(e) => onChange(e.target.value)} />
      <SearchButton disabled>
        <FiUserPlus size={24} />
      </SearchButton>
    </InputWrapper>
  );
};

// Profile 컴포넌트를 AddFriendPage 밖으로 이동
const Profile: React.FC<{
  id: number;
  name: string;
  email: string;
  onAddFriend: (id: number) => void;
}> = ({ id, name, email, onAddFriend }) => (
  <ProfileContainer>
    <ProfileImage src={profileImg} alt={`${name} 프로필`} />
    <ProfileName>{name}</ProfileName>
    <ProfileEmail>{email}</ProfileEmail>
    <AddFriendButton onClick={() => onAddFriend(id)}>친구 추가</AddFriendButton>
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

const ErrorText = styled.p`
  margin-top: 20px;
  color: red;
  font-size: 14px;
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
  cursor: not-allowed;
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
