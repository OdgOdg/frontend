import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { FaHeart, FaRegClock, FaPhoneAlt, FaPen, FaCaretDown, FaChevronRight, FaCopy } from 'react-icons/fa';
import { FiBookOpen } from "react-icons/fi";
import { GrMapLocation } from "react-icons/gr";
import { FaBookmark } from "react-icons/fa6";
import { BiDirections } from 'react-icons/bi';
import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";
import 송도센트럴파크1 from "../../images/MapPage/송도센트럴파크1.jpg";
import 송도센트럴파크2 from "../../images/MapPage/송도센트럴파크2.jpg";
import 송도센트럴파크3 from "../../images/MapPage/송도센트럴파크3.jpg";
import 송도센트럴파크4 from "../../images/MapPage/송도센트럴파크4.jpg";

/* styled-components */

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 30px;
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
  font-size: 18px;
  font-weight: bold;
  color: #00AA5B;
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
  color: black;
  font-weight: 600;
`;

const Distance = styled.div`
  font-size: 13px;
  color: #666;
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

const ImageArea = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 8px;
  overflow-x: auto;
  cursor: grab;
  scroll-behavior: smooth;
`;

const ImageItem = styled.img`
  width: 50%;
  height: 20vh;
  object-fit: cover;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: transparent;
  border: none;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
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
  background-color: #00AA5B;
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

const OperatingHourItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin-top : 4px;
  color: #555;
`;

/* ------------------------- Component & Types ------------------------- */

interface SongdoCentralParkProps { }

interface OperatingHoursDetailsProps {
  expanded: boolean;
}

interface HeartProps {
  active: boolean;
}

interface BookmarkProps {
  active: boolean;
}

const OperatingHoursDetails = styled.div<OperatingHoursDetailsProps>`
  overflow: hidden;
  max-height: ${({ expanded }) => (expanded ? '500px' : '0')};
  opacity: ${({ expanded }) => (expanded ? 1 : 0)};
  transform: translateY(${({ expanded }) => (expanded ? '0' : '-20px')});
  transition: max-height 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
`;

const operatingHours = [
  { day: "월요일", hours: "휴무" },
  { day: "화요일", hours: "24시간 영업" },
  { day: "수요일", hours: "오전 06:00 ~ 오후 10:00" },
  { day: "목요일", hours: "오전 08:00 ~ 오후 12:00" },
  { day: "금요일", hours: "오전 06:00 ~ 오후 10:00" },
  { day: "토요일", hours: "오전 08:00 ~ 오후 12:00" },
  { day: "일요일", hours: "휴무" },
];


const TouchableHeart = styled(FaHeart) <HeartProps>`
  color: ${({ active }) => (active ? 'red' : 'black')};
  cursor: pointer;
  transition: color 0.3s ease;
`;

const StyledBookmark = styled(FaBookmark) <BookmarkProps>`
  color: ${({ active }) => (active ? '#05DC78' : 'white')};
  transition: color 0.3s ease;
`;

const SongdoCentralPark: React.FC<SongdoCentralParkProps> = () => {
  const [heartActive, setHeartActive] = useState(false);
  const toggleHeart = () => {
    setHeartActive((prev) => !prev);
  };

  const [bookmarkActive, setBookmarkActive] = useState(false);
  const toggleBookmark = () => {
    setBookmarkActive((prev) => !prev);
  };

  const [isOperatingHoursExpanded, setIsOperatingHoursExpanded] = useState(false);
  const toggleOperatingHours = () => {
    setIsOperatingHoursExpanded((prev) => !prev);
  };

  const imageAreaRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    if (imageAreaRef.current) {
      setStartX(e.pageX - imageAreaRef.current.offsetLeft);
      setScrollLeft(imageAreaRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !imageAreaRef.current) return;
    e.preventDefault();
    const x = e.pageX - imageAreaRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    imageAreaRef.current.scrollLeft = scrollLeft - walk;
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<{ src: string; alt: string } | null>(null);

  const handleImageClick = (src: string, alt: string) => {
    setCurrentImage({ src, alt });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentImage(null);
  };

  const handleCopyPhoneNumber = () => {
    const phoneNumber = "032-831-9935";
    navigator.clipboard.writeText(phoneNumber)
      .then(() => {
        alert("전화번호가 복사되었습니다!");
      })
      .catch((err) => {
        console.error("복사 실패:", err);
      });
  };

  return (
    <>
      <Header title="" />
      <Container>
        {/* 헤더 영역 */}
        <MapHeader>
          <TitleWrapper>
            <MainTitle>송도 센트럴파크</MainTitle>
            <SubInfo>
              <Status>
                <Text>운영중</Text> | 23:00에 운영 종료
              </Status>
              <Distance>내 위치에서 13.7km</Distance>
            </SubInfo>
          </TitleWrapper>
          <IconWrapper>
            <IconBox>
              <TouchableHeart active={heartActive} onClick={toggleHeart} />
              <span>12</span>
            </IconBox>
            <IconBox>
              <span>📝 7</span>
            </IconBox>
          </IconWrapper>
        </MapHeader>

        {/* 이미지 영역 - 드래그 이벤트와 클릭 이벤트 추가 */}
        <ImageArea
          ref={imageAreaRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <ImageItem
            src={송도센트럴파크1}
            alt="송도 센트럴파크 이미지1"
            onClick={() => handleImageClick(송도센트럴파크1, "송도 센트럴파크 이미지1")}
          />
          <ImageItem
            src={송도센트럴파크2}
            alt="송도 센트럴파크 이미지2"
            onClick={() => handleImageClick(송도센트럴파크2, "송도 센트럴파크 이미지2")}
          />
          <ImageItem
            src={송도센트럴파크3}
            alt="송도 센트럴파크 이미지3"
            onClick={() => handleImageClick(송도센트럴파크3, "송도 센트럴파크 이미지3")}
          />
          <ImageItem
            src={송도센트럴파크4}
            alt="송도 센트럴파크 이미지4"
            onClick={() => handleImageClick(송도센트럴파크4, "송도 센트럴파크 이미지4")}
          />
        </ImageArea>

        {/* 모달 영역 */}
        {modalOpen && currentImage && (
          <ModalOverlay onClick={closeModal}>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <ModalImage src={currentImage.src} alt={currentImage.alt} onClick={(e) => e.stopPropagation()} />
          </ModalOverlay>
        )}

        {/* 버튼 영역 */}
        <ButtonRow>
          <Button>
            <BiDirections />
            길찾기
          </Button>
          <Button onClick={toggleBookmark}>
            <StyledBookmark active={bookmarkActive} />
          </Button>
          <Button>
            <FaPen />
            리뷰 쓰기
          </Button>
        </ButtonRow>

        {/* 상세 정보 영역 */}
        <InfoList>
          <InfoItem onClick={toggleOperatingHours} style={{ cursor: 'pointer' }}>
            <LeftInfo>
              <FaRegClock />
              <span>매일 06:00 - 24:00</span>
            </LeftInfo>
            <FaCaretDown />
          </InfoItem>
          <OperatingHoursDetails expanded={isOperatingHoursExpanded}>
            {operatingHours.map(({ day, hours }) => (
              <OperatingHourItem key={day}>
                <span>{day}</span>
                <span>{hours}</span>
              </OperatingHourItem>
            ))}
          </OperatingHoursDetails>
          <InfoItem>
            <LeftInfo>
              <GrMapLocation />
              <span>인천 연수구 컨벤시아대로391번길 20</span>
            </LeftInfo>
            <FaChevronRight />
          </InfoItem>
          <InfoItem>
            <LeftInfo>
              <FaPhoneAlt />
              <span>032-831-9935</span>
            </LeftInfo>
            <FaCopy onClick={handleCopyPhoneNumber} style={{ cursor: 'pointer' }} />
          </InfoItem>
          <InfoItem>
            <LeftInfo>
              <FiBookOpen />
              <span>리뷰 보기</span>
            </LeftInfo>
            <FaChevronRight />
          </InfoItem>
        </InfoList>
      </Container>
      <BottomNavbar />
    </>
  );
};

export default SongdoCentralPark;
