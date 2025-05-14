import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

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

// ... (기존 import 및 인터페이스 정의) ...

const TourSightListPage: React.FC = () => {
  const navigate = useNavigate();
  const isFetchingRef = useRef(false);
  const [sights, setSights] = useState<TourSight[]>([]);
  const [cursor, setCursor] = useState<number | null>(1);
  const [hasNext, setHasNext] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const loadedIdsRef = useRef<Set<number>>(new Set());

  // 🔁 데이터 패치
  const fetchTourSights = useCallback(async () => {
    // console.log("fetchTourSights 호출됨:", { cursor, hasNext, isFetching: isFetchingRef.current }); // 디버깅용 로그
    if (!hasNext || cursor === null || isFetchingRef.current) {
      // console.log("fetch 조건 불충족. 종료."); // 디버깅용 로그
      return;
    }

    isFetchingRef.current = true;
    // console.log("fetch 시작..."); // 디버깅용 로그

    try {
      const res = await fetch(`/api/v1/sights/pagination?cursor=${cursor}&limit=6&category=1`);
      if (!res.ok) throw new Error("API 호출 실패");

      const json = await res.json();
      const newItems: TourSight[] = Array.isArray(json.data) ? json.data : [];

      const filtered = newItems.filter((item) => !loadedIdsRef.current.has(item.id));
      filtered.forEach((item) => loadedIdsRef.current.add(item.id));

      setSights((prev) => [...prev, ...filtered]);
      setHasNext(json.hasNext);
      setCursor(newItems[newItems.length - 1]?.id ?? null);
      // console.log("fetch 완료:", { newItemsCount: newItems.length, hasNext: json.hasNext, nextCursor: newItems[newItems.length - 1]?.id ?? null }); // 디버깅용 로그
    } catch (error) {
      console.error("fetchTourSights 오류:", error);
    } finally {
      isFetchingRef.current = false;
      // console.log("fetch 종료. isFetchingRef:", isFetchingRef.current); // 디버깅용 로그
    }
  }, [cursor, hasNext]); // cursor와 hasNext가 변경될 때만 fetchTourSights 함수가 갱신됩니다.

  // ✅ 페이지 첫 진입일 때만 fetch
  // sights 배열이 비어있을 때 초기 데이터를 불러옵니다.
  useEffect(() => {
    // console.log("Initial fetch effect. sights.length:", sights.length); // 디버깅용 로그
    if (sights.length === 0) {
      fetchTourSights();
    }
  }, [sights.length, fetchTourSights]); // sights.length가 0이 될 때 (초기 상태) 또는 fetchTourSights 함수가 갱신될 때 실행됩니다.

  // ✅ IntersectionObserver 등록 (sights 있을 때만)
  // 옵저버는 fetchTourSights 호출 조건(hasNext)과 옵저버 타겟 요소에 의존해야 합니다.
  // sights 배열 길이 자체에 의존하면 데이터 로딩 중 옵저버가 불필요하게 재설정될 수 있습니다.
  useEffect(() => {
    // console.log("Observer effect. hasNext:", hasNext, "observerRef.current:", observerRef.current); // 디버깅용 로그
    if (!observerRef.current || !hasNext) {
      // console.log("Observer 설정 조건 불충족. 종료."); // 디버깅용 로그
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // console.log("Observer triggered. isIntersecting:", entries[0].isIntersecting, "isFetching:", isFetchingRef.current); // 디버깅용 로그
        if (entries[0].isIntersecting) {
          fetchTourSights();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);
    // console.log("Observer 시작."); // 디버깅용 로그

    return () => {
      // console.log("Observer 해제."); // 디버깅용 로그
      observer.disconnect();
    };
  }, [fetchTourSights, hasNext]); // ✅ 여기서 sights.length 의존성을 제거했습니다.

  // ✅ 스크롤 위치 복원
  useEffect(() => {
    const savedY = sessionStorage.getItem("scrollY");
    if (savedY !== null) {
      // 100px 위로 조정
      const offset = Math.max(0, parseInt(savedY) - 100);

      // 페이지 렌더링 후 스크롤 이동을 지연
      setTimeout(() => {
        window.scrollTo(0, offset);
        console.log("스크롤 위치 복원 (조정됨):", offset);
      }, 100); // 100ms 정도의 지연
    } else {
      console.log("저장된 스크롤 위치 없음");
    }
  }, []);

  // ✅ 스크롤 위치 저장
  useEffect(() => {
    // 페이지가 종료되기 전에 현재 스크롤 위치를 저장
    return () => {
      sessionStorage.setItem("scrollY", String(window.scrollY));
      console.log("스크롤 위치 저장:", window.scrollY);
    };
  }, []);

  return (
    <div>
      <Header title="관광지 전체보기" />
      <Container>
        {sights.map((sight) => (
          <EventCard key={sight.id} onClick={() => navigate(`/eventviewatmap/${sight.id}`)}>
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

// ✅ 스타일 (변경 없음)
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
  cursor: pointer;

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
