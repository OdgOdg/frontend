/*global kakao*/
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import ReactDOMServer from "react-dom/server";
import 송도센트럴파크 from "../../images/MapPage/송도센트럴파크.jpg";
import 개항장 from "../../images/MapPage/개항장.jpg";
import 계양산 from "../../images/MapPage/계양산.jpg";
import 월미도 from "../../images/MapPage/월미도.jpg";
import 을왕리해수욕장 from "../../images/MapPage/을왕리해수욕장.jpg";
import 차이나타운 from "../../images/MapPage/차이나타운.jpg";
import customMarkerImageSrc from "../../images/MapPage/마커이미지.png"; // PNG 파일 임포트
import BottomNavbar from "../../components/BottomNavbar";

// kakao 객체 타입이 없으면 any로 선언
declare const kakao: any;

// Styled Components (CustomOverlay.css를 기반으로 변환)
const Wrap = styled.div`
  position: relative;
  bottom: 55px; /* 지도 위에서 말풍선을 살짝 올려주고 싶다면 사용 */
  width: 180px;

  & * {
    margin: 0;
    padding: 0;
  }
`;

const Info = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  background: #fff;
`;

const Title = styled.div`
  position: relative;
  padding: 4px 0 4px 8px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  font-weight: bold;
`;

const Close = styled.div`
  position: absolute;
  top: 5px;
  right: 8px;
  width: 17px;
  height: 17px;
  background: url("http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
  cursor: pointer;
`;

const Body = styled.div`
  position: relative;
  display: flex;
  padding: 5px;
`;

const ImgWrapper = styled.div`
  flex-shrink: 0;
`;

const Img = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 3px;
`;

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%; /* 부모의 전체 너비를 사용 */
  text-align: center; /* 텍스트 중앙 정렬 (필요 시) */
`;

const Link = styled.a`
  display: inline-block;
  color: #5085bb;
  text-decoration: none;
  font-size: 14px;
`;

const StyledButton = styled.button`
  width: 85%;
  margin: 10px auto;
  padding: 5px;
  border: none;
  background-color: #00aa5b;
  color: white;
  border-radius: 100px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`;

// OverlayContent 컴포넌트의 props 타입 정의
interface OverlayContentProps {
  index: number;
  title: string;
  imageSrc: string;
  mapLink: string;
}

const OverlayContent: React.FC<OverlayContentProps> = ({ index, title, imageSrc, mapLink }) => (
  <Wrap>
    <Info>
      <Title>
        {title}
        <Close id={`closeBtn_${index}`} title="닫기" />
      </Title>
      <Body>
        <ImgWrapper>
          <Img src={imageSrc} alt="이미지" />
        </ImgWrapper>
        <Desc>
          <StyledButton>상세 정보</StyledButton>
          <Link href={mapLink} target="_blank">
            카카오맵 이동
          </Link>
        </Desc>
      </Body>
    </Info>
  </Wrap>
);

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const overlaysRef = useRef<any[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const options = {
      center: new kakao.maps.LatLng(37.45687, 126.705345),
      level: 8,
      // 모바일에서도 드래그 가능하도록 기본값 설정 (대부분 기본값이지만 명시적으로 설정)
      draggable: true,
    };

    // 지도 생성
    const map = new kakao.maps.Map(mapContainerRef.current, options);
    mapInstanceRef.current = map;
    // 드래그 활성화 (추가 보장)
    map.setDraggable(true);

    // 확대/축소 컨트롤 추가
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 현재 위치를 표시하는 함수 (기본 마커 이미지 사용)
    function displayMarker(locPosition: any, message: string) {
      const marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });
      const infowindow = new kakao.maps.InfoWindow({
        content: message,
      });
      infowindow.open(map, marker);
      map.setCenter(locPosition);
    }

    // 브라우저의 geolocation을 사용하여 현재 위치 표시
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const locPosition = new kakao.maps.LatLng(lat, lon);
        const message = '<div style="padding:5px; width:100%; text-align:center;">현재 위치입니다!</div>';
        displayMarker(locPosition, message);
      });
    } else {
      const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
      const message = "geolocation을 사용할 수 없어요..";
      displayMarker(locPosition, message);
    }

    // PNG 파일을 사용한 커스텀 마커 이미지 생성
    const customMarkerSize = new kakao.maps.Size(30, 30); // 원하는 크기로 조절
    const customMarkerOptions = { offset: new kakao.maps.Point(20, 0) }; // 기준점 설정
    const customMarkerImage = new kakao.maps.MarkerImage(customMarkerImageSrc, customMarkerSize, customMarkerOptions);

    // 오버레이 데이터를 배열로 관리 (각 오버레이마다 content 생성 시 고유 id 할당)
    const overlaysData = [
      {
        position: new kakao.maps.LatLng(37.478653, 126.619381),
        content: (index: number) =>
          ReactDOMServer.renderToString(
            <OverlayContent
              index={index}
              title="차이나타운"
              imageSrc={차이나타운}
              mapLink="https://kko.kakao.com/3wolHfhd1a"
            />
          ),
      },
      {
        position: new kakao.maps.LatLng(37.448224, 126.372506),
        content: (index: number) =>
          ReactDOMServer.renderToString(
            <OverlayContent
              index={index}
              title="을왕리 해수욕장"
              imageSrc={을왕리해수욕장}
              mapLink="https://kko.kakao.com/QJZkpysT3P"
            />
          ),
      },
      {
        position: new kakao.maps.LatLng(37.392414, 126.639544),
        content: (index: number) =>
          ReactDOMServer.renderToString(
            <OverlayContent
              index={index}
              title="송도 센트럴파크"
              imageSrc={송도센트럴파크}
              mapLink="https://kko.kakao.com/ouvopIyXr1"
            />
          ),
      },
      {
        position: new kakao.maps.LatLng(37.474674, 126.621407),
        content: (index: number) =>
          ReactDOMServer.renderToString(
            <OverlayContent index={index} title="개항장" imageSrc={개항장} mapLink="https://kko.kakao.com/Jagjh9pVeU" />
          ),
      },
      {
        position: new kakao.maps.LatLng(37.554784, 126.714914),
        content: (index: number) =>
          ReactDOMServer.renderToString(
            <OverlayContent index={index} title="계양산" imageSrc={계양산} mapLink="https://kko.kakao.com/ddEYd69M4e" />
          ),
      },
      {
        position: new kakao.maps.LatLng(37.472457, 126.600621),
        content: (index: number) =>
          ReactDOMServer.renderToString(
            <OverlayContent index={index} title="월미도" imageSrc={월미도} mapLink="https://kko.kakao.com/2dXwr6CIKR" />
          ),
      },
      // 추가 오버레이 데이터를 원하는 만큼 추가 가능
    ];

    overlaysData.forEach((data, index) => {
      // 각 오버레이의 위치에 마커 생성 (PNG 파일을 사용한 커스텀 마커 이미지 적용)
      const marker = new kakao.maps.Marker({
        map: map,
        position: data.position,
        image: customMarkerImage,
      });

      const overlay = new kakao.maps.CustomOverlay({
        content: data.content(index),
        map: null, // 초기에는 오버레이를 표시하지 않음
        position: data.position,
      });

      // 마커 클릭 시 해당 오버레이를 표시하고, 닫기 버튼 이벤트를 등록
      kakao.maps.event.addListener(marker, "click", function () {
        // 다른 오버레이 모두 닫기
        overlaysRef.current.forEach((ov) => ov.setMap(null));
        overlay.setMap(map);

        // 오버레이의 DOM이 렌더링된 후 닫기 버튼에 직접 이벤트 리스너 등록
        setTimeout(() => {
          const closeBtn = document.getElementById(`closeBtn_${index}`);
          if (closeBtn) {
            const closeOverlay = () => overlay.setMap(null);
            // 데스크탑과 모바일에서 모두 작동하도록 click과 touchend 이벤트 등록
            closeBtn.addEventListener("click", closeOverlay);
            closeBtn.addEventListener("touchend", closeOverlay);
          }
        }, 0);
      });

      overlaysRef.current.push(overlay);
    });

    // 모바일 터치 드래그 이벤트를 수동으로 처리하여 지도 이동 지원
    if ("ontouchstart" in window) {
      let startX: number | null = null;
      let startY: number | null = null;
      const container = mapContainerRef.current;

      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          const touch = e.touches[0];
          startX = touch.clientX;
          startY = touch.clientY;
        }
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (startX === null || startY === null) return;
        const touch = e.touches[0];
        const deltaX = startX - touch.clientX;
        const deltaY = startY - touch.clientY;
        // 지도 이동: panBy 메서드는 x, y (픽셀 단위)만큼 이동
        map.panBy(deltaX, deltaY);
        startX = touch.clientX;
        startY = touch.clientY;
        // 기본 스크롤 동작 방지
        e.preventDefault();
      };

      const handleTouchEnd = () => {
        startX = null;
        startY = null;
      };

      container?.addEventListener("touchstart", handleTouchStart);
      container?.addEventListener("touchmove", handleTouchMove);
      container?.addEventListener("touchend", handleTouchEnd);

      // 컴포넌트 언마운트 시 이벤트 제거
      return () => {
        container?.removeEventListener("touchstart", handleTouchStart);
        container?.removeEventListener("touchmove", handleTouchMove);
        container?.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, []);

  return (
    <>
      <div>
        <div id="map" ref={mapContainerRef} style={{ width: "100%", height: "100vh" }}></div>
      </div>
      <BottomNavbar />
    </>
  );
};

export default Map;
