import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";
import React from "react";
import styled from "styled-components";

const events = [
  {
    title: "포스코타워 수직 마라톤",
    location: "포스코타워",
    date: "2024.8.23 - 8.31",
    image: "https://cdn.newscj.com/news/photo/202410/3184388_3226436_5326.jpg", // 이미지 URL 대체 필요
  },
  {
    title: "2024 제5회 송도해변축제",
    location: "송도달빛공원 일원",
    date: "2024.8.10 - 8.15",
    image: "https://dxtimes.co.kr/news/data/20230701/p1065582577146468_822_thum.gif",
  },
  {
    title: "2024 제12회 연수 능허대 문화축제",
    location: "송도달빛공원 및 능허대공원 일원",
    date: "2024.10.4 - 10.6",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJYYEyhvBuyct_cAPy14fjX24E2gKiEOg6-w&s",
  },
  {
    title: "2024 제12회 연수 능허대 문화축제",
    location: "송도달빛공원 및 능허대공원 일원",
    date: "2024.10.4 - 10.6",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJYYEyhvBuyct_cAPy14fjX24E2gKiEOg6-w&s",
  },
  {
    title: "2024 제12회 연수 능허대 문화축제",
    location: "송도달빛공원 및 능허대공원 일원",
    date: "2024.10.4 - 10.6",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJYYEyhvBuyct_cAPy14fjX24E2gKiEOg6-w&s",
  },
  {
    title: "2024 제12회 연수 능허대 문화축제",
    location: "송도달빛공원 및 능허대공원 일원",
    date: "2024.10.4 - 10.6",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJYYEyhvBuyct_cAPy14fjX24E2gKiEOg6-w&s",
  },
];

const EventListPage: React.FC = () => {
  return (
    <div>
      <Header title="축제 전체보기" />
      <Container>
        {events.map((event, index) => (
          <EventCard key={index}>
            <Image src={event.image} alt={event.title} />
            <Info>
              <Title>{event.title}</Title>
              <Location>{event.location}</Location>
              <Date>{event.date}</Date>
            </Info>
          </EventCard>
        ))}
      </Container>
      <BottomNavbar />
    </div>
  );
};

export default EventListPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  /* max-height: 100vh; */
  overflow-y: auto;
  background-color: #f9f9f9;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none; /* 웹킷 브라우저에서 스크롤바 숨김 */
  }

  scrollbar-width: none; /* Firefox에서 스크롤바 숨김 */
  -ms-overflow-style: none; /* Internet Explorer 및 Edge에서 스크롤바 숨김 */
`;

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  h3 {
    margin: 0;
  }
  p {
    margin: 8px;
  }
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
`;

const Info = styled.div`
  padding: 16px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Location = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 4px;
`;

const Date = styled.p`
  font-size: 14px;
  color: #888;
`;
