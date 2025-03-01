import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";
import styled from "styled-components";
import { FaPaperPlane, FaPhone } from "react-icons/fa";
import { useState } from "react";
import profileImg from "../../images/chatPage/gilDong.png";

const ChatRoomPage: React.FC = () => {
  const [messages, setMessages] = useState([
    { text: "안녕하세요!", timeStamp: "10:10", isUser: false },
    {
      text: "오늘 맥주축제 같이 가기로 약속했던 홍길동입니다. 축제장 근처에 도착해있어요! 지금 어디쯤 오셨나요?",
      timeStamp: "10:10",
      isUser: false,
    },
    {
      text: "안녕하세요~",
      timeStamp: "10:12",
      isUser: true,
    },
    {
      text: "저도 축제장 근처에 거의 다 왔습니다. 도착하면 음성통화 드릴게요",
      timeStamp: "10:12",
      isUser: true,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, timeStamp: input, isUser: true }]);
      setInput("");
    }
  };

  return (
    <>
      <Header title="채팅" />
      <ChatRoomHeader>
        <ProfileWrapper>
          <ProfileImage src={profileImg} alt="Profile" />
          <ProfileName>홍길동</ProfileName>
        </ProfileWrapper>
        <CallIcon>
          <FaPhone />
        </CallIcon>
      </ChatRoomHeader>
      <ChatContainer>
        <ChatBody>
          {messages.map((msg, index) => (
            <ChatBubble key={index} isUser={msg.isUser}>
              {msg.text}
              <TimeStamp>{msg.timeStamp}</TimeStamp>
            </ChatBubble>
          ))}
        </ChatBody>
        <ChatInputContainer>
          <ChatInput value={input} onChange={(e) => setInput(e.target.value)} />
          <SendButton onClick={handleSend}>
            <FaPaperPlane />
          </SendButton>
        </ChatInputContainer>
      </ChatContainer>
      <BottomNavbar />
    </>
  );
};

const ChatContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #f0f0f3;
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 20px;
  padding-bottom: 70px; /* 입력창 공간 확보 */
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChatBubble = styled.div<{ isUser: boolean }>`
  max-width: 75%;
  padding: 20px;
  margin: 5px 0;
  border-radius: 30px;
  background: ${(props) => (props.isUser ? "#00AA5B" : "#FFFFFF")};
  color: ${(props) => (props.isUser ? "white" : "black")};
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  white-space: pre-line; /* 개행 문자 적용 */
`;

const TimeStamp = styled.div`
  font-size: 12px;
  margin-top: 10px;
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-top: 1px solid #ccc;
  background: white;
  position: fixed;
  bottom: 12%;
  left: 50%;
  transform: translate(-50%, 50%);
  border-radius: 50px;
  width: 90%; /* 기본적으로 넓게 설정 */
  max-width: 550px; /* 최대 너비 조정 */

  @media (max-width: 768px) {
    width: 85%; /* 태블릿 크기 */
  }
`;

const ChatInput = styled.input`
  flex: 1;
  border-radius: 5px;
  border: none;
  outline: none;
  padding-left: 30px;
  font-size: 18px;
  &::placeholder {
    color: #999;
    font-size: 18px;
  }
`;

const SendButton = styled.button`
  background: #00aa5b;
  color: white;
  border: none;
  padding: 10px;
  margin-left: 5px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 채팅방 관련 스타일
const ChatRoomHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const ProfileName = styled.span`
  font-size: 20px;
`;

const CallIcon = styled.div`
  font-size: 20px;
  color: #00aa5b;
  cursor: pointer;
`;

export default ChatRoomPage;
