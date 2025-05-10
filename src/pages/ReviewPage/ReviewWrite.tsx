import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";

/* ---------------------------- Styled Components ---------------------------- */

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  padding: 16px;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const SubTitle = styled.h2`
  font-size: 14px;
  margin: 0;
  font-weight: 400;
  color: gray;
`;

const KeywordContainer = styled.div`
  margin-bottom: 24px;
`;

const KeywordGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

interface KeywordButtonProps {
  isSelected: boolean;
}

const KeywordButton = styled.button<KeywordButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px;
  border-radius: 10px;
  border: ${(props) => (props.isSelected ? "2px solid #00AA5B" : "2px solid #ced4da")};
  background-color: ${(props) => (props.isSelected ? "#00AA5B" : "#fff")};
  color: ${(props) => (props.isSelected ? "#fff" : "#495057")};
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const ReviewTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  border: 2px solid #ced4da;
  border-radius: 10px;
  padding: 10px;
  font-size: 14px;
  resize: none;
  margin-bottom: 20px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #40c057;
  }
`;

const SubmitButton = styled.button`
  display: block;
  width: 60%;
  padding: 14px;
  background-color: #00aa5b;
  color: #fff;
  border: none;
  border-radius: 100px;
  font-size: 16px;
  cursor: pointer;
  margin: 0 auto;

  &:hover {
    opacity: 0.9;
  }
`;

/* ------------------------- Component ------------------------- */

interface LocationState {
  site: { id: number; title: string };
}

const ReviewForm: React.FC = () => {
  const navigate = useNavigate();
  // location.state를 통해 전달된 site 데이터 추출
  const { state } = useLocation<LocationState>();
  const site = state?.site;
  if (!site) {
    return <div>잘못된 접근입니다.</div>;
  }

  // site.title이 20자 이상인 경우 잘라서 ... 추가
  const displayTitle = site.title.length > 20 ? site.title.slice(0, 20) + "..." : site.title;

  // 선택 가능한 키워드 목록
  const leftKeywords = [
    "🕹️ 즐길거리가 많아요",
    "📸 사진찍기 좋아요",
    "👀 볼거리가 많아요",
    "🅿️ 주차하기 편해요",
    "🚌 대중교통이 편해요",
    "💵 가격이 합리적이에요",
  ];
  const rightKeywords = [
    "🕺 혼자 가기 좋아요",
    "👩‍❤️‍👨 연인과 가기 좋아요",
    "👫 친구와 가기 좋아요",
    "👨‍👩‍👦 가족과 가기 좋아요",
  ];

  // flatten array for id mapping
  const allKeywords = [...leftKeywords, ...rightKeywords];

  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [reviewText, setReviewText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) => (prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword]));
  };

  const handleSubmit = async () => {
    // 1) 키워드 미선택 시 경고 후 탈출
    if (selectedKeywords.length === 0) {
      alert("키워드를 최소 하나 이상 선택해주세요!");
      return;
    }

    // 2) 기존 로직: advantages 배열 계산
    const advantages = selectedKeywords
      .map((kw) => allKeywords.indexOf(kw))
      .filter((idx) => idx >= 0)
      .map((idx) => idx + 1);

    const payload = {
      sightId: site.id,
      content: reviewText,
      advantages,
    };

    setLoading(true);
    try {
      const res = await fetch("/api/v1/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        alert(data.message || "리뷰 작성이 완료되었습니다!");
        navigate(-1);
      } else {
        alert(data.message || "리뷰 작성에 실패했습니다.");
      }
    } catch {
      alert("리뷰 작성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        title={
          <>
            <span style={{ color: "#00AA5B" }}>{displayTitle}</span>
            <span style={{ fontSize: "14px" }}> 에 대한 리뷰를 작성해주세요!</span>
          </>
        }
      />

      <Container>
        <div>
          <TopSection>
            <Title>어떤 점이 좋았나요?</Title>
            <SubTitle>이 곳에 어울리는 키워드를 선택해주세요!</SubTitle>
          </TopSection>

          <KeywordContainer>
            <KeywordGrid>
              {allKeywords.map((keyword) => (
                <KeywordButton
                  key={keyword}
                  isSelected={selectedKeywords.includes(keyword)}
                  onClick={() => toggleKeyword(keyword)}
                >
                  {keyword}
                </KeywordButton>
              ))}
            </KeywordGrid>
          </KeywordContainer>

          <ReviewTextArea
            placeholder="✏️리뷰를 작성해 주세요!"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />

          <SubmitButton onClick={handleSubmit} disabled={loading}>
            {loading ? "등록 중..." : "등록 하기"}
          </SubmitButton>
        </div>
      </Container>
      <BottomNavbar paddingBottom={false} />
    </>
  );
};

export default ReviewForm;
