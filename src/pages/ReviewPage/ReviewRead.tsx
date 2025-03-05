import React from "react";
import styled from "styled-components";
import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";

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

interface ReviewItemProps {
  userName: string;
  date: string;
  content: string;
  tags?: string[];
}

function maskName(name: string): string {
  if (name.length <= 2) {
    return name[0] + "*";
  }
  return name[0] + "*" + name.slice(2);
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
  return (
    <>
      <Header
        title={
          <>
            <span style={{ color: "#00AA5B", fontSize: "16px" }}>송도센트럴 파크</span>
            <span style={{ fontSize: "14px" }}>에 대한 리뷰입니다.</span>
          </>
        }
      />
      <Container>
        {/* 요약 박스: 리뷰/좋아요 + 이모티콘 */}
        <SummaryBoxWrapper>
          <SummaryBox>
            <SummaryIcon>📝</SummaryIcon>
            <SummaryLabel>리뷰</SummaryLabel>
            <SummaryValue>7개</SummaryValue>
          </SummaryBox>
          <SummaryBox>
            <SummaryIcon>❤️</SummaryIcon>
            <SummaryLabel>좋아요</SummaryLabel>
            <SummaryValue>12개</SummaryValue>
          </SummaryBox>
        </SummaryBoxWrapper>

        {/* 키워드 박스 (사진, 교통, 연인) */}
        <KeywordBoxWrapper>
          <KeywordBox>
            <KeywordIcon>📷</KeywordIcon>
            사진찍기 좋아요
          </KeywordBox>
          <KeywordBox>
            <KeywordIcon>🚌</KeywordIcon>
            대중교통이 편해요
          </KeywordBox>
          <KeywordBox>
            <KeywordIcon>👩‍❤️‍👨</KeywordIcon>
            연인과 가기 좋아요
          </KeywordBox>
        </KeywordBoxWrapper>

        {/* 리뷰 목록 */}
        <ReviewList>
          <ReviewItem
            userName="김지훈"
            date="25년 1월 21일"
            content="학술적으로 건축양식이나 피크닉 즐기기 좋은 공원입니다. 키 크고 예쁜 건물들이 많아서 색다른 건물들을 감상하실 수 있어요. 숲속 산책이나 행사도 종종 열려서 가족 단위로도 많이 방문하더라고요."
            tags={["📸 사진찍기 좋아요", "🚌 대중교통이 편해요", "💵 가격이 합리적이에요", "👩‍❤️‍👨 연인과 가기 좋아요"]}
          />
          <ReviewItem
            userName="주영준"
            date="25년 1월 20일"
            content="직장인으로서 처음 가봤는데 산책하기도 좋고 건물도 너무 예쁘며 힐링하고 왔습니다. 주변에 맛집도 많고, 야경도 볼만하니 퇴근 후 가볍게 둘러보기에도 괜찮습니다."
            tags={["👀 볼거리가 많아요", "👫 친구와 가기 좋아요"]}
          />
          <ReviewItem
            userName="고해찬"
            date="25년 3월 1일"
            content="3.1절 기념으로 부모님과 함께 놀러갔는데 낮에는 공원이 너무 예쁘고 밤에는 야경이 너무 예쁩니다! 제가 캐나다에 갔다온 적이 있는데 그에 못지않은 광활하고 아름다운 공원이에요! 송도 진짜 짱입니다~"
            tags={["💵 가격이 합리적이에요"]}
          />
          <ReviewItem
            userName="홍동기"
            date="25년 3월 3일"
            content="솔직히 그닥 다른 공원들이랑 별 차이점을 못느끼겠음. 역이랑도 그리 가까운 편은 아님. "
            tags={["🕺 혼자 가기 좋아요"]}
          />
        </ReviewList>
      </Container>
      <BottomNavbar />
    </>
  );
};

export default ReviewPage;
