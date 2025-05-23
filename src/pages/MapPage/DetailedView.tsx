import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FaHeart, FaPen, FaChevronRight, FaCopy } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { GrMapLocation } from "react-icons/gr";
import { FaBookmark } from "react-icons/fa6";
import { BiDirections } from "react-icons/bi";
import { FaRegShareSquare } from "react-icons/fa";
import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";

/* styled-components 정의 (생략) */
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 30px;
  padding: 30px 30px 60px;
  box-sizing: border-box;
  background-color: #fff;
  color: #333;
`;
const MapHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const MainTitle = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  color: #00aa5b;
`;
const SubInfo = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Status = styled.div`
  font-size: 14px;
  color: #333;
`;
const Text = styled.span`
  font-size: 18px;
  color: #666;
  font-weight: 600;
`;
const IconWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 1rem;
`;
const IconBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  color: #333;
  span {
    margin-left: 8px;
  }
`;
const ImageWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
`;
const ImageItem = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;
const ButtonRow = styled.div`
  display: flex;
  margin-top: 18px;
  gap: 8px;
`;
const Button = styled.button`
  flex: 0.33;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: #00aa5b;
  color: #fff;
  padding: 10px 0;
  border: none;
  border-radius: 100px;
  font-size: 14px;
  cursor: pointer;
  svg {
    font-size: 16px;
  }
  &:hover {
    background-color: rgb(2, 145, 79);
  }
`;
const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const InfoItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid grey;
  padding-bottom: 5px;
  font-size: 16px;
  color: black;
`;
const LeftInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  svg {
    font-size: 24px;
    color: #666;
  }
`;

interface LocationState {
  id: number;
  title: string;
  addr1: string;
  likeCount: number;
  firstimage: string;
  category: number;
}

interface ReviewType {
  id: number;
  sightId: number;
  content: string;
  date: string;
  advantages: string[];
}

const DetailedView: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation<LocationState | null>();
  const params = useParams<{ id: string }>();
  const [site, setSite] = useState<LocationState | null>(
    state
      ? { ...state, likeCount: state.likeCount ?? 0 } // 넘어온 state에 likeCount 없으면 0
      : null
  );
  const [loading, setLoading] = useState(!state);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard
      .writeText(site.addr1)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch((err) => {
        console.error("주소 복사 실패:", err);
      });
  };

  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleCopyUrl = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 1500);
      })
      .catch((err) => console.error("URL 복사 실패:", err));
  };

  useEffect(() => {
    if (!site && params.id) {
      setLoading(true);
      fetch(`/api/v1/sights/${params.id}`)
        .then((res) => {
          if (!res.ok) throw new Error("조회 실패");
          return res.json();
        })
        .then((data: LocationState) => setSite(data))
        .catch(() => navigate("/", { replace: true }))
        .finally(() => setLoading(false));
    }
  }, [params.id, site, navigate]);

  // site.id가 정해지면 리뷰 API 호출해서 개수 설정
  useEffect(() => {
    if (site) {
      fetch(`/api/v1/review/${site.id}`)
        .then((res) => {
          if (!res.ok) throw new Error("리뷰 조회 실패");
          return res.json();
        })
        .then((data: ReviewType[]) => {
          setReviewCount(data.length);
        })
        .catch((err) => {
          console.error(err);
          setReviewCount(0);
        });
    }
  }, [site]);

  // 1) 사이트 로드 완료되면, 로그인된 경우 좋아요 상태 조회
  useEffect(() => {
    if (site) {
      const token = localStorage.getItem("token");
      if (!token) return; // 로그인 안 됐으면 패스

      fetch(`/api/v1/like?sightId=${site.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("좋아요 상태 조회 실패");
          return res.json();
        })
        // `{ isLiked: boolean }` 형태로 반환된다고 가정
        .then((data: { isLiked: boolean }) => setIsLiked(data.isLiked))
        .catch((err) => console.error(err));
    }
  }, [site]);

  // 2) 하트 클릭 시 좋아요 토글 함수
  const handleLikeToggle = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!site) return;

    const newLiked = !isLiked;

    try {
      const res = await fetch("/api/v1/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sightId: site.id,
          isLiked: newLiked,
        }),
      });

      if (!res.ok) {
        // 좋아요 취소 시( newLiked === false ) 서버가 400을 리턴하면
        if (!newLiked && res.status === 400) {
          // 이 경우는 “삭제 완료”로 간주
          console.warn("서버가 400을 반환했지만, 삭제 완료로 간주합니다.");
        } else {
          // 나머지 에러는 throw
          const errText = await res.text();
          throw new Error(`(${res.status}) ${errText}`);
        }
      }

      // UI에 반영
      setIsLiked(newLiked);
      setSite((prev) =>
        prev
          ? {
              ...prev,
              likeCount: (prev.likeCount ?? 0) + (newLiked ? +1 : -1),
            }
          : prev
      );
    } catch (err: any) {
      console.error("좋아요 처리 중 오류:", err);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (!site) return <div>잘못된 접근입니다.</div>;

  // 렌더링 본문
  return (
    <>
      <Header title="" />
      <Container>
        <MapHeader>
          <TitleWrapper>
            <MainTitle>{site.title}</MainTitle>
            <SubInfo>
              <Status>
                <Text>{site.category === 2 ? "🎆 축제" : "🏞️ 관광지"}</Text>
              </Status>
            </SubInfo>
          </TitleWrapper>
          <IconWrapper>
            <IconBox>
              <FaHeart
                style={{
                  color: isLiked ? "red" : "black",
                  cursor: "pointer",
                }}
                onClick={handleLikeToggle}
              />
              <span>{site.likeCount}</span>
            </IconBox>
            <IconBox>
              <span>📝 {reviewCount}</span>
            </IconBox>
          </IconWrapper>
        </MapHeader>

        <ImageWrapper>
          <ImageItem src={site.firstimage} alt={site.title} />
        </ImageWrapper>

        <ButtonRow>
          <Button onClick={() => window.open("https://kko.kakao.com/aY2KP6sKoN", "_blank")}>
            <BiDirections />
            카카오맵 이동
          </Button>
          <Button onClick={() => {}}>
            <FaBookmark />
          </Button>
          <Button onClick={() => navigate("/reviewwrite", { state: { site } })}>
            <FaPen />
            리뷰 쓰기
          </Button>
        </ButtonRow>

        <InfoList>
          <InfoItem onClick={handleCopyAddress} style={{ cursor: "pointer" }} title="주소 복사">
            <LeftInfo>
              <GrMapLocation />
              <span>{site.addr1}</span>
              {copied && <em style={{ marginLeft: 8, color: "#00aa5b", fontSize: 14 }}>복사됨!</em>}
            </LeftInfo>
            <FaCopy />
          </InfoItem>
          <InfoItem style={{ cursor: "pointer" }} onClick={() => navigate("/reviewread", { state: { site } })}>
            <LeftInfo>
              <FiBookOpen />
              <span>리뷰 보기</span>
            </LeftInfo>
            <FaChevronRight />
          </InfoItem>
          <InfoItem onClick={handleCopyUrl} style={{ cursor: "pointer" }} title="URL 복사">
            <LeftInfo>
              <FaRegShareSquare />
              <span>공유 하기</span>
              {copiedUrl && <em style={{ marginLeft: 8, color: "#00aa5b", fontSize: 14 }}>URL 복사됨!</em>}
            </LeftInfo>
            <FaCopy />
          </InfoItem>
        </InfoList>
      </Container>
      <BottomNavbar paddingBottom={false} />
    </>
  );
};

export default DetailedView;
