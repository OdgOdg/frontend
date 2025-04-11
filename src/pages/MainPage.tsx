import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import eventImage from "../images/mainPage/event.png";
import sightsImage from "../images/mainPage/sights.png";
import BottomNavbar from "../components/BottomNavbar";
import React, { useState, useRef } from "react";
import SearchWithSuggestions from "./SearchWithSuggestions";

const MainPage: React.FC = () => {
  const [banners, setBanners] = useState([
    {
      image: eventImage,
      title: "포스코타워 수직 마라톤",
      location: "포스코타워",
      date: "2024.8.23 - 8.31",
      isFavorite: false,
    },
    { image: eventImage, title: "두 번째 배너", location: "설명 텍스트", date: "날짜 정보", isFavorite: false },
    { image: eventImage, title: "세 번째 배너", location: "설명 텍스트", date: "날짜 정보", isFavorite: false },
  ]);

  const bannerRef = useRef<HTMLDivElement>(null);

  const toggleFavorite = (index: number) => {
    setBanners((prevBanners) =>
      prevBanners.map((banner, i) => (i === index ? { ...banner, isFavorite: !banner.isFavorite } : banner))
    );
  };

  const scrollLeft = () => {
    if (bannerRef.current) {
      bannerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (bannerRef.current) {
      bannerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <Container>
      <MainPageHeader>
        <Logo>ITG</Logo>
        <SearchWithSuggestions />
        <Icon>֎</Icon>
      </MainPageHeader>
      <Section>
        <SectionHeader>
          <Title>진행중인 축제</Title>
          <More>전체보기 &gt;</More>
        </SectionHeader>
        <Banner>
          <ArrowLeft onClick={scrollLeft}>
            <FaChevronLeft />
          </ArrowLeft>
          <BannerWrapper ref={bannerRef}>
            {banners.map((banner, index) => (
              <BannerItem key={index}>
                <FavoriteIcon onClick={() => toggleFavorite(index)} $isFavorite={banner.isFavorite}>
                  <FaHeart />
                </FavoriteIcon>
                <BannerImage src={banner.image} alt={banner.title} />
                <BannerText>
                  <h2>{banner.title}</h2>
                  <p>{banner.location}</p>
                  <p>{banner.date}</p>
                </BannerText>
                <GradientOverlayTop />
                <GradientOverlayBottom />
              </BannerItem>
            ))}
          </BannerWrapper>
          <ArrowRight onClick={scrollRight}>
            <FaChevronRight />
          </ArrowRight>
        </Banner>
      </Section>
      <Divider />
      <Section>
        <SectionHeader>
          <Title>근처 관광지</Title>
          <More>전체보기 &gt;</More>
        </SectionHeader>
        <TouristList>
          {[1, 2, 3].map((item, index) => (
            <TouristItem key={index}>
              <TouristImage src={sightsImage} alt="솔찬공원" />
              <TouristInfo>
                <h3>솔찬공원</h3>
                <p>대부도와 무의도, 영종도까지 바라볼 수 있는 산책하기 좋은 공원</p>
                <Address>인천 연수구 컨벤시아대로 391번길 20</Address>
                <LikesLivewsContainer>
                  <Likes>
                    <FaHeart color="red" /> 12
                  </Likes>
                  <Reviews>
                    <MdArticle /> 12
                  </Reviews>
                </LikesLivewsContainer>
              </TouristInfo>
            </TouristItem>
          ))}
        </TouristList>
      </Section>
      <BottomNavbar />
    </Container>
  );
};

export default MainPage;

// Styled Components

const MainPageHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const SearchBar = styled.input`
  flex: 1;
  margin: 0 25px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Icon = styled.span`
  font-size: 28px;
`;

const Section = styled.section`
  padding: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const More = styled.span`
  color: #007bff;
  cursor: pointer;
`;

const GradientOverlayTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
`;

const GradientOverlayBottom = styled.div`
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 25%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
`;

const BannerText = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  z-index: 1;

  h2 {
    margin: 0;
    margin-bottom: 5px;
  }

  p {
    margin: 0;
  }
`;

const TouristList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TouristItem = styled.div`
  display: flex;
  background: #f9f9f9;
  overflow: hidden;
`;

const TouristImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
`;

const TouristInfo = styled.div`
  flex: 1;
  h3 {
    margin: 0;
    margin-top: 5px;
    margin-left: 10px;
  }
  p {
    margin: 0;
    margin-top: 10px;
    margin-left: 10px;
  }
`;

const LikesLivewsContainer = styled.div`
  display: flex;
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
  padding: 0 10px 10px 10px;
`;

const Reviews = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
  padding: 0 10px 10px 10px;
`;

const Address = styled.p`
  font-size: 10px;
  color: gray;
`;

const FavoriteIcon = styled.div<{ $isFavorite: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s;
  color: ${({ $isFavorite }) => ($isFavorite ? "white" : "red")};
  -webkit-text-stroke: ${({ $isFavorite }) => ($isFavorite ? "0px" : "2px white")};
  z-index: 1;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #e0e0e0;
  margin: 20px 0;
`;

const Container = styled.div`
  padding: 16px;
`;

const ArrowLeft = styled.button`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.6); // 반투명 배경
  color: #007bff; // 아이콘 색상
  border: none; // 테두리 없음
  border-radius: 50%; // 둥근 모서리
  cursor: pointer;
  padding: 12px; // 패딩 조정
  z-index: 2;
  transition:
    background 0.3s,
    transform 0.3s; // 부드러운 전환 효과

  &:hover {
    background: rgba(255, 255, 255, 0.8); // 호버 시 배경색 변경
    transform: translateY(-50%) scale(1.1); // 호버 시 크기 증가
  }
`;

const ArrowRight = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.6); // 반투명 배경
  color: #007bff; // 아이콘 색상
  border: none; // 테두리 없음
  border-radius: 50%; // 둥근 모서리
  cursor: pointer;
  padding: 12px; // 패딩 조정
  z-index: 2;
  transition:
    background 0.3s,
    transform 0.3s; // 부드러운 전환 효과

  &:hover {
    background: rgba(255, 255, 255, 0.8); // 호버 시 배경색 변경
    transform: translateY(-50%) scale(1.1); // 호버 시 크기 증가
  }
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const BannerWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  gap: 10px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  scroll-behavior: smooth;
`;

const BannerItem = styled.div`
  flex: 0 0 100%;
  scroll-snap-align: start;
  position: relative;
`;

const BannerImage = styled.img`
  width: 100%;
`;
