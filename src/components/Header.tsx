import React from "react";
import styled from "styled-components";
import { GoPersonAdd } from "react-icons/go";
import chatbotImage from "../images/chatbot_icon.jpg";
import { useNavigate } from "react-router-dom";

const Header: React.FC<HeaderProps> = ({ title, showAddFriendIcon = false, isChatBotPage = false }) => {
  const navigate = useNavigate();

  return (
    <NavBar>
      <BackButton onClick={() => window.history.back()}>{`<`}</BackButton>

      {isChatBotPage ? (
        <ChatBotHeader>
          <BotImage src={chatbotImage} alt="ChatBot" />
          <Title>{title}</Title>
          <OnlineStatus>🟢 Online</OnlineStatus>
        </ChatBotHeader>
      ) : (
        <Title>{title}</Title>
      )}

      <IconContainer>
        {showAddFriendIcon && (
          <Icon onClick={() => navigate("/addfriend")}>
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
