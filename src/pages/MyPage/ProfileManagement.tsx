import React, { useState } from 'react';
import styled from 'styled-components';
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";
import { FaCamera } from 'react-icons/fa';

/* styled-components */

const ProfileContainer = styled.div`
  width: 80%;
  padding : 10px;
  margin: auto;
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #e0e0e0;
  position: relative;

  svg {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #fff;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
  }
`;

const InputContainer = styled.div`
  margin-bottom: 30px;

  label {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 5px;
    display: block;
  }

  input {
    width: 100%;
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 14px;

    &:focus {
      outline: none;
      border-bottom: 1px solid #00AA5B;
    }
  }

  .email {
    color:rgb(0, 0, 0);
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }
`;

const SaveButton = styled.button`
  width: 60%;
  padding: 12px;
  font-size: 18px;
  color: white;
  background-color: #00AA5B;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  display: block;
  margin: 50px auto auto auto;

  &:hover {
    opacity:0.9;
  }
`;

/* ------------------------- Component & Types ------------------------- */

const ProfileManagement = () => {
  const [name, setName] = useState('');
  const [intro, setIntro] = useState('');

  const handleSave = () => {
    alert(`이름: ${name}\n소개글: ${intro}`);
  };

  return (
    <>
      <Header title="프로필 관리" />
      <ProfileContainer>


        {/* Profile Image */}
        <ProfileImageWrapper>
          <ProfileImage>
            <FaCamera size={20} />
          </ProfileImage>
        </ProfileImageWrapper>

        {/* Inputs */}
        <InputContainer>
          <label>이름</label>
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <label>소개글</label>
          <input
            type="text"
            placeholder="소개글을 입력해주세요"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <label>학교 이메일</label>
          <div className="email">20201532@inu.ac.kr</div>
        </InputContainer>

        {/* Save Button */}
        <SaveButton onClick={handleSave}>저장하기</SaveButton>

      </ProfileContainer>
      <BottomNavbar />

    </>
  );
};

export default ProfileManagement;
