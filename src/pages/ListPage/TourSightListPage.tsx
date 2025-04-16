import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";
import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";

interface TourSight {
  id: number;
  title: string;
  addr1: string;
  addr2: string | null;
  dist: number;
  firstimage: string | null;
  firstimage2: string | null;
  mapx: number;
  mapy: number;
  tel: string | null;
}

const TourSightListPage: React.FC = () => {
  const [sights, setSights] = useState<TourSight[]>([]);
  const [cursor, setCursor] = useState<number | null>(1); // 시작 커서
  const [hasNext, setHasNext] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchTourSights = useCallback(async () => {
    if (!hasNext || cursor === null) return;

    const res = await fetch(`api/v1/sights/pagination?cursor=${cursor}`);
    if (!res.ok) {
      console.error("API 호출 실패", res.status);
      return;
    }
    const json = await res.json();
    if (!Array.isArray(json.data)) {
      console.error("json.data가 배열이 아님", json);
      return;
    }
    setSights((prev) => {
      const newIds = new Set(prev.map((item) => item.id));
      const filtered = json.data.filter((item) => !newIds.has(item.id));
      return [...prev, ...filtered];
    });
    setHasNext(json.hasNext);
    const nextCursor = json.data[json.data.length - 1]?.id ?? null;
    setCursor(nextCursor);
  }, [cursor, hasNext]);

  useEffect(() => {
    fetchTourSights();
  }, [fetchTourSights]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext) {
          fetchTourSights();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [fetchTourSights, hasNext]);

  return (
    <div>
      <Header title="관광지 전체보기" />
      <Container>
        {sights.map((sight) => (
          <EventCard key={sight.id}>
            <Image
              src={sight.firstimage || "/fallback.png"}
              alt={sight.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/fallback.png";
              }}
            />
            <Info>
              <Title>{sight.title}</Title>
              <Location>{sight.addr1}</Location>
              <Date>인천대학교에서 {(sight.dist / 1000).toFixed(1)}km</Date>
            </Info>
          </EventCard>
        ))}
        <div ref={observerRef} style={{ height: "20px" }} />
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
  /* max-height: 100vh; */
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
  flex: 0 1 calc(50% - 16px); // 한 줄에 2개 카드
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
