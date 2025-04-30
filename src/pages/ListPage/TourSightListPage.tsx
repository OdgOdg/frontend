import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";

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
  const [cursor, setCursor] = useState<number | null>(1);
  const [hasNext, setHasNext] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchTourSights = useCallback(async () => {
    if (!hasNext || cursor === null) return;

    try {
      const res = await fetch(`/api/v1/sights/pagination?cursor=${cursor}&limit=6&category=1`);
      if (!res.ok) throw new Error("API 호출 실패");

      const json = await res.json();

      if (!Array.isArray(json.data)) throw new Error("json.data가 배열이 아님");

      const prevIds = new Set(sights.map((item) => item.id));
      const newSights = json.data.filter((item) => !prevIds.has(item.id));

      setSights((prev) => [...prev, ...newSights]);
      setHasNext(json.hasNext);
      const nextCursor = json.data[json.data.length - 1]?.id ?? null;
      setCursor(nextCursor);
    } catch (error) {
      console.error("fetchTourSights 오류:", error);
    }
  }, [cursor, hasNext, sights]);

  // 최초 로딩
  useEffect(() => {
    fetchTourSights();
  }, []);

  // Intersection Observer
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchTourSights();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchTourSights]);

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
        <ObserverTarget ref={observerRef} />
      </Container>
      <BottomNavbar />
    </div>
  );
};

export default TourSightListPage;

// 스타일

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px;
  background-color: #f9f9f9;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const EventCard = styled.div`
  flex: 0 1 calc(50% - 16px);
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

const ObserverTarget = styled.div`
  height: 20px;
  width: 100%;
`;
