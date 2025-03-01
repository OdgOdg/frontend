import React from "react";
import styled from "styled-components";
import { FiPhone, FiPhoneOff } from "react-icons/fi";
import profileImage from "../../images/chatPage/JihoonProfile.png";

const IncomingCall: React.FC = () => {
  return (
    <Container>
      <ProfileImage src={profileImage} alt="Profile" />
      <Name>홍길동</Name>
      <ButtonContainer>
        <CallButton>
          <FiPhoneOff />
        </CallButton>
        <CallButton accept>
          <FiPhone />
        </CallButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const ProfileImage = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
`;

const Name = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 200px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 60px;
`;

const CallButton = styled.button<{ accept?: boolean }>`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: ${(props) => (props.accept ? "#2ecc71" : "#e74c3c")};
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    opacity: 0.8;
  }
`;

export default IncomingCall;
