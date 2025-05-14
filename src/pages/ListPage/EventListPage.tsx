import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom"; // useNavigate 추가

interface Event {
  id: number;
  title: string;
  location: string;
  date: string;
  image: string;
}

const EventListPage: React.FC = () => {
  const navigate = useNavigate(); // navigate 훅 사용
  const [events, setEvents] = useState<Event[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasNext, setHasNext] = useState(true);
  const loadingRef = useRef(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchEvents = useCallback(async () => {
    if (!hasNext || loadingRef.current) return;
    loadingRef.current = true;

    try {
      const res = await fetch(`/api/v1/sights/pagination?cursor=${cursor ?? ""}&limit=6&category=2`);
      if (!res.ok) throw new Error("이벤트 API 호출 실패");

      const json = await res.json();
      const newEvents = json.data.map((e: any) => ({
        id: e.id,
        title: e.title,
        location: e.addr1,
        date: `${e.startDate} ~ ${e.endDate}`,
        image: e.firstimage,
      }));

      setEvents((prev) => {
        const combined = [...prev, ...newEvents];
        const unique = Array.from(new Map(combined.map((e) => [e.id, e])).values());
        return unique;
      });

      if (json.data.length > 0) {
        const lastId = json.data[json.data.length - 1].id;
        setCursor(lastId);
      }

      setHasNext(json.hasNext);
    } catch (error) {
      console.error("이벤트 불러오기 오류:", error);
    } finally {
      loadingRef.current = false;
    }
  }, [cursor, hasNext]);

  // ✅ 페이지 첫 진입일 때만 fetch
  useEffect(() => {
    if (events.length === 0) {
      fetchEvents();
    }
  }, [events.length, fetchEvents]);

  // ✅ IntersectionObserver 등록 (events 있을 때만)
  useEffect(() => {
    if (!observerRef.current || !hasNext) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchEvents();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [fetchEvents, hasNext]);

  // ✅ 스크롤 위치 복원
  useEffect(() => {
    const savedY = sessionStorage.getItem("scrollY");
    if (savedY !== null) {
      const offset = Math.max(0, parseInt(savedY) - 100);
      setTimeout(() => {
        window.scrollTo(0, offset);
      }, 100);
    }
  }, []);

  // ✅ 스크롤 위치 저장
  useEffect(() => {
    return () => {
      sessionStorage.setItem("scrollY", String(window.scrollY));
    };
  }, []);

  return (
    <div>
      <Header title="축제 전체보기" />
      <Container>
        {events.map((event) => (
          <EventCard key={event.id} onClick={() => navigate(`/detailedview/${event.id}`)}>
            {" "}
            {/* 클릭 시 상세 페이지로 이동 */}
            <Image
              src={event.image || "/fallback.png"}
              alt={event.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/fallback.png";
              }}
            />
            <Info>
              <Title>{event.title}</Title>
              <Location>{event.location}</Location>
              <Date>{event.date}</Date>
            </Info>
          </EventCard>
        ))}
        <div ref={observerRef} style={{ height: 1 }} />
      </Container>
      <BottomNavbar />
    </div>
  );
};

export default EventListPage;

// CSS는 그대로 유지
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  overflow-y: auto;
  background-color: #f9f9f9;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer; /* 카드 클릭 가능하도록 수정 */

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
