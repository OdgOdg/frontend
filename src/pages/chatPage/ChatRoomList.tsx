import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";

import React from "react";
import styled from "styled-components";

// 채팅방 데이터 타입 정의
interface Chat {
  id: number;
  name: string;
  message: string;
  time: string;
  date?: string;
  avatar: string;
}

// 더미 데이터
const chatData: Chat[] = [
  {
    id: 1,
    name: "홍길동",
    message: "저도 축제장 근처에 거의 도착 ...",
    time: "10:25",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "김철수",
    message: "카페가자",
    time: "22:20",
    date: "09/05",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "김영희",
    message: "오 고마워",
    time: "10:45",
    date: "08/05",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    name: "김수한",
    message: "!!",
    time: "20:10",
    date: "05/05",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "이도",
    message: "맥주축제 어때?",
    time: "17:02",
    date: "05/05",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6,
    name: "이근모",
    message: "눈 많이 온다",
    time: "11:20",
    date: "05/05",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const ChatRoomList: React.FC = () => {
  return (
    <>
      <Header title="채팅" showAddFriendIcon={true} />
      <ChatListContainer>
        {chatData.map((chat) => (
          <ChatItem key={chat.id}>
            <Avatar src={chat.avatar} alt={chat.name} />
            <ChatDetails>
              <ChatName>{chat.name}</ChatName>
              <ChatMessage>{chat.message}</ChatMessage>
            </ChatDetails>
            <ChatTime>{chat.date ? `${chat.time} ${chat.date}` : chat.time}</ChatTime>
          </ChatItem>
        ))}
      </ChatListContainer>
      <BottomNavbar />
    </>
  );
};

// 스타일 정의
const ChatListContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  height: 100vh;
`;

const ChatItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  &:hover {
    background: #f9f9f9;
  }
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

const ChatDetails = styled.div`
  flex: 1;
`;

const ChatName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const ChatMessage = styled.div`
  font-size: 14px;
  color: gray;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ChatTime = styled.div`
  font-size: 12px;
  color: gray;
`;

export default ChatRoomList;
