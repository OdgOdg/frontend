import BottomNavbar from "../components/BottomNavbar";
import Header from "../components/Header";
import styled from "styled-components";
import { FaPaperPlane } from "react-icons/fa";
import { useState } from "react";

const ChatBotPage: React.FC = () => {
  const [messages, setMessages] = useState([
    { text: "연수구 내에 있는 대학들에 대해 알려줘", isUser: true },
    {
      text: "인천광역시 연수구에는 다양한 대학교와 캠퍼스가 위치해 있습니다. 주요 대학들은 다음과 같습니다:\n 1. 인천대학교\n 2. 연세대학교 국제캠퍼스\n 3. 인천재능대학교\n 4. 인천 글로벌 캠퍼스(IGC)",
      isUser: false,
    },
    {
      text: "인천대학교 근처에 바다가 잘 보이는 카페가 있어?",
      isUser: true,
    },
    {
      text: "인천대학교 근처에는 바다 전망을 즐길 수 있는 카페들이 있습니다.\n케이슨24(Caisson24)\n인천 연수구, 대한민국\n인천대학교 바로 뒤편에 위치한 복합문화공간으로, 바다를 바라보며 커피와 베이커리를 즐길 수 있습니다. 야외 좌석과 다양한 문화 행사가 제공되며, 솔찬공원과 인접해 있어 산책하기에도 좋습니다.\n카페드라페(Café de Lape)\n인천 연수구, 대한민국\n송도에 위치한 카페로, 바다와 가까워 아름다운 전망을 제공합니다. 조용한 분위기에서 커피를 즐기며 휴식을 취하기에 좋습니다.\nSteemit\n이러한 카페들은 인천대학교 인근에서 바다 전망을 즐기며 휴식을 취하기에 좋은 장소들입니다.",
      isUser: false,
    },
    {
      text: "인천대학교 근처에는 바다 전망을 즐길 수 있는 카페들이 있습니다.\n케이슨24(Caisson24)\n인천 연수구, 대한민국\n인천대학교 바로 뒤편에 위치한 복합문화공간으로, 바다를 바라보며 커피와 베이커리를 즐길 수 있습니다. 야외 좌석과 다양한 문화 행사가 제공되며, 솔찬공원과 인접해 있어 산책하기에도 좋습니다.\n카페드라페(Café de Lape)\n인천 연수구, 대한민국\n송도에 위치한 카페로, 바다와 가까워 아름다운 전망을 제공합니다. 조용한 분위기에서 커피를 즐기며 휴식을 취하기에 좋습니다.\nSteemit\n이러한 카페들은 인천대학교 인근에서 바다 전망을 즐기며 휴식을 취하기에 좋은 장소들입니다.",
      isUser: false,
    },
    {
      text: "인천대학교 근처에는 바다 전망을 즐길 수 있는 카페들이 있습니다.\n케이슨24(Caisson24)\n인천 연수구, 대한민국\n인천대학교 바로 뒤편에 위치한 복합문화공간으로, 바다를 바라보며 커피와 베이커리를 즐길 수 있습니다. 야외 좌석과 다양한 문화 행사가 제공되며, 솔찬공원과 인접해 있어 산책하기에도 좋습니다.\n카페드라페(Café de Lape)\n인천 연수구, 대한민국\n송도에 위치한 카페로, 바다와 가까워 아름다운 전망을 제공합니다. 조용한 분위기에서 커피를 즐기며 휴식을 취하기에 좋습니다.\nSteemit\n이러한 카페들은 인천대학교 인근에서 바다 전망을 즐기며 휴식을 취하기에 좋은 장소들입니다.",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput("");
    }
  };

  return (
    <>
      <Header title="ChatGPT" isChatBotPage={true} />
      <ChatContainer>
        <ChatBody>
          {messages.map((msg, index) => (
            <ChatBubble key={index} isUser={msg.isUser}>
              {msg.text}
            </ChatBubble>
          ))}
        </ChatBody>
        <ChatInputContainer>
          <ChatInput value={input} onChange={(e) => setInput(e.target.value)} placeholder="궁금하신 점이 있으신가요?" />
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
  padding-bottom: 100px; /* 입력창 공간 확보 */
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
  background: ${(props) => (props.isUser ? "#007bff" : "#FFFFFF")};
  color: ${(props) => (props.isUser ? "white" : "black")};
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  white-space: pre-line; /* 개행 문자 적용 */
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
  background: #007bff;
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

export default ChatBotPage;
