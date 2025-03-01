import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";
import React from "react";
import styled from "styled-components";

const events = [
  {
    title: "센트럴파크",
    location: "내 위치에서 13.7km",
    date: "운영 중 | 23:00에 운영 종료",
    image: "https://www.jonghapnews.com/news/photo/202408/434646_339900_4152.jpg",
  },
  {
    title: "월미도",
    location: "내 위치에서 25.7km",
    date: "운영 중 | 23:00에 운영 종료",
    image:
      "https://i.namu.wiki/i/jDYl3xK8uotCA3p3dD-EFufHlRJPWbYLExnhfIp5YlewDm3FO0lggA4q1xyIpWkoQl-P-NkHuSQ5ZYDzgW_6Sg.webp",
  },
  {
    title: "차이나 타운",
    location: "내 위치에서 22.4km",
    date: "운영 중 | 23:00에 운영 종료",
    image:
      "https://i.namu.wiki/i/THNrcPT8iCfcGD1sWT8SnxJQySX5-5ayZVHL6EYqiOSlgDZ18ZUObKFB8RyIa8r2gq_rMPFsGbREM1ROzJdnXg.webp",
  },
  {
    title: "센트럴파크",
    location: "내 위치에서 13.7km",
    date: "운영 중 | 23:00에 운영 종료",
    image: "https://www.jonghapnews.com/news/photo/202408/434646_339900_4152.jpg",
  },
  {
    title: "월미도",
    location: "내 위치에서 25.7km",
    date: "운영 중 | 23:00에 운영 종료",
    image:
      "https://i.namu.wiki/i/jDYl3xK8uotCA3p3dD-EFufHlRJPWbYLExnhfIp5YlewDm3FO0lggA4q1xyIpWkoQl-P-NkHuSQ5ZYDzgW_6Sg.webp",
  },
  {
    title: "차이나 타운",
    location: "내 위치에서 22.4km",
    date: "운영 중 | 23:00에 운영 종료",
    image:
      "https://i.namu.wiki/i/THNrcPT8iCfcGD1sWT8SnxJQySX5-5ayZVHL6EYqiOSlgDZ18ZUObKFB8RyIa8r2gq_rMPFsGbREM1ROzJdnXg.webp",
  },
  {
    title: "센트럴파크",
    location: "내 위치에서 13.7km",
    date: "운영 중 | 23:00에 운영 종료",
    image: "https://www.jonghapnews.com/news/photo/202408/434646_339900_4152.jpg",
  },
  {
    title: "월미도",
    location: "내 위치에서 25.7km",
    date: "운영 중 | 23:00에 운영 종료",
    image:
      "https://i.namu.wiki/i/jDYl3xK8uotCA3p3dD-EFufHlRJPWbYLExnhfIp5YlewDm3FO0lggA4q1xyIpWkoQl-P-NkHuSQ5ZYDzgW_6Sg.webp",
  },
  {
    title: "차이나 타운",
    location: "내 위치에서 22.4km",
    date: "운영 중 | 23:00에 운영 종료",
    image:
      "https://i.namu.wiki/i/THNrcPT8iCfcGD1sWT8SnxJQySX5-5ayZVHL6EYqiOSlgDZ18ZUObKFB8RyIa8r2gq_rMPFsGbREM1ROzJdnXg.webp",
  },
  // 추가 이벤트를 여기에 추가
];

const TourSightListPage: React.FC = () => {
  return (
    <div>
      <Header title="관광지 전체보기" />
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

export default TourSightListPage;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap; /* 카드가 넘치면 다음 줄로 이동 */
  gap: 16px; /* 카드 간격 */
  padding: 20px;
  max-height: 100vh;
  overflow-y: auto; /* 수직 스크롤 활성화 */
  background-color: #f9f9f9;
  padding-right: 0;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none; /* 웹킷 브라우저에서 스크롤바 숨김 */
  }

  scrollbar-width: none; /* Firefox에서 스크롤바 숨김 */
  -ms-overflow-style: none; /* Internet Explorer 및 Edge에서 스크롤바 숨김 */
`;

const EventCard = styled.div`
  flex: 0 1 calc(33.33% - 16px); /* 한 줄에 3개 카드 (16px은 gap) */
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
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
