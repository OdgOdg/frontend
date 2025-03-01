import React from "react";
import styled from "styled-components";
import { GoPersonAdd } from "react-icons/go";
import chatbotImage from "../images/chatbot_icon.jpg";

// title 타입을 React.ReactNode로 변경
interface HeaderProps {
  title: React.ReactNode;
  showAddFriendIcon?: boolean;
  isChatBotPage?: boolean; // 챗봇 페이지 여부 추가
}

const Header: React.FC<HeaderProps> = ({ title, showAddFriendIcon = false, isChatBotPage = false }) => {
  return (
    <NavBar>
      <BackButton onClick={() => window.history.back()}>{`<`}</BackButton>

      {isChatBotPage ? (
        <ChatBotHeader>
          <BotImage src={chatbotImage} alt="ChatBot" /> {/* 챗봇 이미지 */}
          <Title>{title}</Title>
          <OnlineStatus>🟢 Online</OnlineStatus>
        </ChatBotHeader>
      ) : (
        <Title>{title}</Title>
      )}

      <IconContainer>
        {showAddFriendIcon && (
          <Icon>
            <GoPersonAdd />
          </Icon>
        )}
      </IconContainer>
    </NavBar>
  );
};

export default Header;

// 스타일 정의
const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-color: white;
  border-bottom: 1px solid #ddd;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
`;

const BackButton = styled.button`
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  left: 16px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
`;

const IconContainer = styled.div`
  position: absolute;
  right: 16px;
`;

const Icon = styled.div`
  cursor: pointer;
  font-size: 30px;
  padding-top: 10px;
`;

const ChatBotHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BotImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const OnlineStatus = styled.span`
  font-size: 14px;
  color: green;
`;
