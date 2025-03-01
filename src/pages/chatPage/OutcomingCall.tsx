import React from "react";
import styled from "styled-components";
import { FiMic, FiVolume2, FiPhoneOff } from "react-icons/fi";
import profileImage from "../../images/chatPage/gilDong.png";

const OutgoingCall: React.FC = () => {
  return (
    <Container>
      <Content>
        <StatusText>발신중 ...</StatusText>
        <ProfileImage src={profileImage} alt="Profile" />
        <Name>홍길동</Name>
        <ButtonContainer>
          <CallButton>
            <FiMic />
          </CallButton>
          <CallButton>
            <FiVolume2 />
          </CallButton>
          <CallButton end>
            <FiPhoneOff />
          </CallButton>
        </ButtonContainer>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url(${profileImage}) no-repeat center/cover;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
  }
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const StatusText = styled.p`
  font-size: 24px;
  color: white;
  margin-bottom: 60px;
`;

const ProfileImage = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
  border: 3px solid white;
`;

const Name = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-bottom: 200px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const CallButton = styled.button<{ end?: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: ${(props) => (props.end ? "#e74c3c" : "#ffffff")};
  color: ${(props) => (props.end ? "white" : "black")};
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    opacity: 0.8;
  }
`;

export default OutgoingCall;
