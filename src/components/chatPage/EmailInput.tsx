import React from "react";
import styled from "styled-components";
import { FiUserPlus } from "react-icons/fi";

const EmailInput = () => {
  return (
    <InputWrapper>
      <StyledInput placeholder="이메일을 입력해 주세요" />
      <SearchButton>
        <FiUserPlus size={24} />
      </SearchButton>
    </InputWrapper>
  );
};

export default EmailInput;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 400px; /* 필요에 따라 조절 */
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 20px;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
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
