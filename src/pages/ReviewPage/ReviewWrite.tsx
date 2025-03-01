// ReviewForm.tsx
import React, { useState } from "react";
import styled from 'styled-components';
import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";

const Container = styled.div`
  width: 360px;
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
  grid-template-columns: 1fr 1fr; /* 2컬럼 */
  gap: 8px;
`;

const KeywordButton = styled.button<KeywordButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px;
  border: 3px solid #ced4da;
  border-radius: 10px;
  border: ${(props) => (props.isSelected ? "3px solid #00AA5B" : "3px solid #ced4da")};
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
  background-color: #00AA5B;
  color: #fff;
  border: none;
  border-radius: 100px;
  font-size: 16px;
  cursor: pointer;
  margin: 0 auto;

  &:hover {
    opacity : 0.9;
  }
`;

interface KeywordButtonProps {
    isSelected: boolean;
}

const ReviewForm: React.FC = () => {

    const leftKeywords = [
        "🕹️ 즐길거리가 많아요",
        "📸 사진찍기 좋아요",
        "👀 볼거리가 많아요",
        "🅿️ 주차하기 편해요",
        "🚌 대중교통이 편해요",
        "💵 가격이 합리적이에요",
    ];
    const rightKeywords = [
        "👶 아이와 가기 좋아요",
        "👩‍❤️‍👨 연인과 가기 좋아요",
        "👫 친구와 가기 좋아요",
        "👨‍👩‍👦 부모님과 가기 좋아요",
    ];

    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

    const [reviewText, setReviewText] = useState<string>("");

    const toggleKeyword = (keyword: string) => {
        setSelectedKeywords((prev) =>
            prev.includes(keyword)
                ? prev.filter((k) => k !== keyword)
                : [...prev, keyword]
        );
    };

    const handleSubmit = () => {
        const reviewData = {
            keywords: selectedKeywords,
            reviewText,
        };
        console.log("리뷰 데이터:", reviewData);
        alert("리뷰가 등록되었습니다!");
        setSelectedKeywords([]);
        setReviewText("");
    };

    return (
        <>
            <Header
                title={
                    <>
                        <span style={{ color: "#00AA5B" }}>송도센트럴 파크</span>
                        <span style={{ fontSize: "14px" }}>에 대한 리뷰를 작성해주세요!</span>
                    </>
                }
            />

            <Container>
                {/* 상단 컨텐츠 */}
                <div>
                    <TopSection>
                        <Title>어떤 점이 좋았나요?</Title>
                        <SubTitle>이 곳에 어울리는 키워드를 선택해주세요! (1~5개) </SubTitle>
                    </TopSection>

                    {/* 키워드 선택 영역 */}
                    <KeywordContainer>
                        <KeywordGrid>
                            {leftKeywords.map((keyword) => (
                                <KeywordButton
                                    key={keyword}
                                    isSelected={selectedKeywords.includes(keyword)}
                                    onClick={() => toggleKeyword(keyword)}
                                >
                                    {keyword}
                                </KeywordButton>
                            ))}
                            {rightKeywords.map((keyword) => (
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

                    {/* 리뷰 텍스트 작성 */}
                    <ReviewTextArea
                        placeholder="✏️리뷰를 작성해 주세요!"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    />

                    {/* 등록 버튼 */}
                    <SubmitButton onClick={handleSubmit}>등록 하기</SubmitButton>
                </div>
            </Container>
            <BottomNavbar />
        </>
    );
};

export default ReviewForm;
