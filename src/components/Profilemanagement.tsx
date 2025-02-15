import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCamera, FaHome, FaCalendarAlt, FaCommentDots, FaBell, FaCog } from 'react-icons/fa';

const ProfileContainer = styled.div`
  width: 320px;
  height: 568px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
    width: 90%;
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 14px;

    &:focus {
      outline: none;
      border-bottom: 1px solid #00796b;
    }
  }

  .email {
    color:rgb(0, 0, 0);
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }
`;

const SaveButton = styled.button`
  width: 50%;
  padding: 10px;
  font-size: 18px;
  color: white;
  background-color: #00AA5B;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  display: block;
  margin: 50px auto auto auto;

  &:hover {
    background-color: #008a5a;
  }
`;

const ProfileManagement = () => {
  const [name, setName] = useState('');
  const [intro, setIntro] = useState('');

  const handleSave = () => {
    alert(`이름: ${name}\n소개글: ${intro}`);
  };

  return (
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
  );
};

export default ProfileManagement;
