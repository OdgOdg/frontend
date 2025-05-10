import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";

/* ───────── styled-components ───────── */

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: #fff;
  color: #333;
  position: relative;
`;

const SummaryBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 20px;
  gap: 20px;
`;

const SummaryBox = styled.div`
  flex: 1;
  background-color: #efefef;
  border-radius: 8px;
  padding: 12px;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SummaryIcon = styled.div`
  font-size: 22px;
  margin-bottom: 4px;
`;

const SummaryLabel = styled.div`
  font-size: 15px;
  color: #666;
`;

const SummaryValue = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 4px;
`;

const KeywordBoxWrapper = styled.div`
  display: flex;
  justify-content: center; /* 가로 방향 중앙 정렬 */
  margin: 12px 16px;
  gap: 8px;
`;

const KeywordBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #fafafa;
  border: 1px solid #e6e6e6;
  padding: 8px 12px;
  border-radius: 16px;
  font-size: 14px;
`;

const KeywordIcon = styled.span`
  font-size: 16px;
`;

const ReviewList = styled.div`
  margin: 16px;
`;

const ReviewContainer = styled.div`
  position: relative;
  padding: 16px 0;

  &::after {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;

    width: 100vw;
    border-bottom: 2px solid #eee;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserName = styled.span`
  font-weight: bold;
  font-size: 14px;
`;

const ReviewDate = styled.span`
  font-size: 12px;
  color: #999;
`;

const ReviewContent = styled.p`
  margin: 8px 0;
  font-size: 14px;
  line-height: 1.4;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const Tag = styled.span`
  background-color: #f5f5f5;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 10px;
  color: #666;
`;

/* ------------------------- Component & Types ------------------------- */

interface Site {
  id: number;
  title: string;
}

interface Review {
  id: number;
  sightId: number;
  content: string;
  date: string; // "2025-05-10" 같은 ISO 문자열
  advantages: string[]; // 태그 리스트
}

function formatReviewDate(iso: string): string {
  const d = new Date(iso);
  const yy = String(d.getFullYear()).slice(-2);
  const mm = d.getMonth() + 1;
  const dd = d.getDate();
  return `${yy}년 ${mm}월 ${dd}일`;
}

function maskName(name: string): string {
  if (name.length <= 2) {
    return name[0] + "*";
  }
  return name[0] + "*" + name.slice(2);
}

function truncate(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

/** 개별 리뷰 아이템을 렌더링하는 컴포넌트 */
const ReviewItem: React.FC<ReviewItemProps> = ({ userName, date, content, tags }) => {
  return (
    <ReviewContainer>
      <UserInfo>
        {}
        <UserName>{maskName(userName)}</UserName>
        <ReviewDate>{date}</ReviewDate>
      </UserInfo>
      {}
      <ReviewContent>{content}</ReviewContent>
      {tags && (
        <TagContainer>
          {tags.map((tag, index) => (
            <Tag key={`${tag}-${index}`}>{tag}</Tag>
          ))}
        </TagContainer>
      )}
    </ReviewContainer>
  );
};

/** 메인 페이지 컴포넌트 */
const ReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { site?: Site };
  const site = state.site;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const displayTitle = truncate(site.title, 20);

  useEffect(() => {
    // sightId 기반으로 API 호출
    fetch(`/api/v1/review/${site.id}`)
      .then((res) => res.json())
      .then((data: Review[]) => {
        setReviews(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [site.id]);

  const advantageIconMap: Record<string, string> = {
    "즐길 거리가 많아요": "🕹️",
    "사진 찍기 좋아요": "📸",
    "볼거리가 많아요": "👀",
    "주차하기 편해요": "🅿️",
    "대중교통이 편해요": "🚌",
    "가격이 합리적이에요": "💵",
    "혼자 가기 좋아요": "🕺",
    "연인과 가기 좋아요": "👩‍❤️‍👨",
    "친구와 가기 좋아요": "👫",
    "가족과 가기 좋아요": "👨‍👩‍👦",
  };

  // 리뷰가 바뀔 때마다 빈도 계산해서 상위 3개 태그 추출
  const topKeywords = React.useMemo(() => {
    const freq: Record<string, number> = {};
    reviews.forEach((r) =>
      r.advantages.forEach((tag) => {
        const key = tag.trim();
        freq[key] = (freq[key] || 0) + 1;
      })
    );
    return Object.entries(freq)
      .sort(([, a], [, b]) => b - a) // 빈도 내림차순
      .slice(0, 3) // 상위 3개
      .map(([tag]) => tag);
  }, [reviews]);

  const formatTag = (tag: string) => (advantageIconMap[tag] ? `${advantageIconMap[tag]} ${tag}` : tag);

  if (!state.site) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <>
      <Header
        title={
          <>
            {/* 잘라진 제목 사용 */}
            <span style={{ color: "#00AA5B", fontSize: "16px" }}>{displayTitle}</span>
            <span style={{ fontSize: "14px" }}> 에 대한 리뷰입니다.</span>
          </>
        }
      />
      <Container>
        {/* 요약 박스: 리뷰/좋아요 + 이모티콘 */}
        <SummaryBoxWrapper>
          <SummaryBox>
            <SummaryIcon>📝</SummaryIcon>
            <SummaryLabel>리뷰</SummaryLabel>
            <SummaryValue>{loading ? "..." : `${reviews.length}개`}</SummaryValue>
          </SummaryBox>
          <SummaryBox>
            <SummaryIcon>❤️</SummaryIcon>
            <SummaryLabel>좋아요</SummaryLabel>
            <SummaryValue>12개</SummaryValue>
          </SummaryBox>
        </SummaryBoxWrapper>

        {/* 키워드 박스 (상위 3개) */}
        <KeywordBoxWrapper>
          {topKeywords.map((tag) => (
            <KeywordBox key={tag}>
              <KeywordIcon>{advantageIconMap[tag]}</KeywordIcon>
              {tag}
            </KeywordBox>
          ))}
        </KeywordBoxWrapper>

        {/* 리뷰 목록 */}
        <ReviewList>
          {loading ? (
            <div>리뷰를 불러오는 중...</div>
          ) : reviews.length === 0 ? (
            <div>아직 등록된 리뷰가 없어요.</div>
          ) : (
            reviews.map((review) => (
              <ReviewItem
                key={review.id}
                userName="김지훈"
                date={formatReviewDate(review.date)}
                content={review.content}
                // 여기서 tag마다 아이콘을 붙여줌
                tags={review.advantages.map(formatTag)}
              />
            ))
          )}
        </ReviewList>
      </Container>
      <BottomNavbar />
    </>
  );
};

export default ReviewPage;
