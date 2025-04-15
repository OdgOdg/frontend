/*global kakao*/
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ReactDOMServer from "react-dom/server";
import { CiLocationArrow1 } from "react-icons/ci";
import { FiRefreshCw, FiX } from "react-icons/fi";
import customMarkerImageSrc from "../../images/MapPage/마커이미지.png";
import BottomNavbar from "../../components/BottomNavbar";

// kakao 객체 타입이 없으면 any로 선언
declare const kakao: any;

/*--------------------- Styled Components ----------------------*/

// 고정된 BottomNavbar 래퍼
const FixedNavbarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

// 지도 상단의 검색바 컨테이너
const SearchBarContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 45%;
  transform: translateX(-50%);
  width: 60%;
  z-index: 1000;
  display: flex;
  justify-content: center;
`;

// 검색 입력창을 감싸는 Wrapper (아이콘 배치를 위해 relative 처리)
const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

// 검색 입력창 스타일
const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 40px 0 12px;  /* 오른쪽에 아이콘이 들어갈 공간 확보 */
  font-size: 16px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  outline: none;
`;

// 검색창 텍스트를 지우기 위한 'x' 아이콘 버튼
const ClearButton = styled.button`
  position: absolute;
  right: -40px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

// 드롭다운 컨테이너 (자동완성 결과)
const DropdownContainer = styled.div`
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  max-height: 300px;
  overflow-y: auto;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

// 드롭다운 항목 스타일
const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  &:hover {
    background-color: #f0f0f0;
  }
`;

// 오버레이 관련 스타일들
const Wrap = styled.div`
  position: relative;
  bottom: 55px;
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
  width: 100%;
  text-align: center;
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

// 오른쪽 하단의 "현재 위치로 이동" 버튼 스타일
const CurrentLocationButton = styled.button`
  position: absolute;
  bottom: 80px;
  right: 20px;
  z-index: 999;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.8;
  }
`;

/** 중앙 하단에 "현재 위치에서 검색" 버튼 스타일 **/
const SearchFromCurrentLocationButton = styled.button`
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 16px;
  border: none;
  border-radius: 100px;
  background-color: white;
  color: #333;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  z-index: 999;
  &:hover {
    opacity: 0.9;
  }
`;

/*--------------------- OverlayContent 컴포넌트 ----------------------*/
interface OverlayContentProps {
  index: number;
  title: string;
  imageSrc: string;
  mapLink: string;
}

const OverlayContent: React.FC<OverlayContentProps> = ({
  index,
  title,
  imageSrc,
  mapLink,
}) => (
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

/*--------------------- Main Map 컴포넌트 ----------------------*/
const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  // API에서 생성한 마커들을 관리하기 위한 배열
  const apiMarkersRef = useRef<any[]>([]);
  // 현재 표시된 오버레이를 저장하는 Ref
  const currentOverlayRef = useRef<any>(null);
  // 검색 입력값 및 드롭다운 결과 상태
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // (기존 기능) 자동완성: 입력이 변경될 때마다 드롭다운 결과 업데이트
  const handleAutoComplete = async () => {
    if (!searchQuery.trim() || !mapInstanceRef.current) {
      setSearchResults([]);
      return;
    }
    const encodedTitle = encodeURIComponent(searchQuery.trim());
    const apiUrl = `/api/v1/sights/title/${encodedTitle}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("API 요청 실패");
      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error("자동완성 검색 중 에러 발생:", error);
    }
  };

  // 디바운스 적용: searchQuery 변경 시 300ms 후에 handleAutoComplete 실행
  useEffect(() => {
    const timer = setTimeout(() => {
      handleAutoComplete();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // (기능1) 엔터키를 누르면 해당 검색어에 맞는 전체 관광지 마커 표시
  const handleSearchMarkers = async () => {
    if (!searchQuery.trim() || !mapInstanceRef.current) return;
    const encodedTitle = encodeURIComponent(searchQuery.trim());
    const apiUrl = `/api/v1/sights/title/${encodedTitle}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("API 요청 실패");
      const results = await response.json();

      // 기존 마커 및 오버레이 제거
      apiMarkersRef.current.forEach((marker) => marker.setMap(null));
      apiMarkersRef.current = [];
      if (currentOverlayRef.current) {
        currentOverlayRef.current.setMap(null);
      }

      // 커스텀 마커 이미지 생성
      const customMarkerSize = new kakao.maps.Size(30, 30);
      const customMarkerOptions = { offset: new kakao.maps.Point(20, 0) };
      const customMarkerImage = new kakao.maps.MarkerImage(
        customMarkerImageSrc,
        customMarkerSize,
        customMarkerOptions
      );

      // 검색 결과의 모든 관광지에 대해 마커 생성
      results.forEach((site: any, idx: number) => {
        const position = new kakao.maps.LatLng(site.mapy, site.mapx);
        const marker = new kakao.maps.Marker({
          map: mapInstanceRef.current,
          position: position,
          image: customMarkerImage,
        });

        kakao.maps.event.addListener(marker, "click", function () {
          if (currentOverlayRef.current) {
            currentOverlayRef.current.setMap(null);
          }
          const overlayContent = ReactDOMServer.renderToString(
            <OverlayContent
              index={idx}
              title={site.title}
              imageSrc={site.firstimage || ""}
              mapLink={`http://localhost:8001/sight/${site.id}`}
            />
          );
          const overlay = new kakao.maps.CustomOverlay({
            content: overlayContent,
            map: mapInstanceRef.current,
            position: position,
          });
          currentOverlayRef.current = overlay;
          setTimeout(() => {
            const closeBtn = document.getElementById(`closeBtn_${idx}`);
            if (closeBtn) {
              const closeOverlay = () => {
                overlay.setMap(null);
                currentOverlayRef.current = null;
              };
              closeBtn.addEventListener("click", closeOverlay);
              closeBtn.addEventListener("touchend", closeOverlay);
            }
          }, 0);
        });
        apiMarkersRef.current.push(marker);
      });

      // 검색 후 드롭다운 및 검색창 클리어
      setSearchResults([]);
      setSearchQuery("");
    } catch (error) {
      console.error("전체 관광지 마커 검색 중 에러 발생:", error);
    }
  };

  // (기능2) 드롭다운 항목 선택 시 해당 관광지 중심으로 지도 이동 및 오버레이 표시
  const handleSelectResult = (site: any) => {
    // 기존 마커 및 오버레이 제거
    apiMarkersRef.current.forEach((marker) => marker.setMap(null));
    apiMarkersRef.current = [];
    if (currentOverlayRef.current) {
      currentOverlayRef.current.setMap(null);
    }
    const position = new kakao.maps.LatLng(site.mapy, site.mapx);

    const customMarkerSize = new kakao.maps.Size(30, 30);
    const customMarkerOptions = { offset: new kakao.maps.Point(20, 0) };
    const customMarkerImage = new kakao.maps.MarkerImage(
      customMarkerImageSrc,
      customMarkerSize,
      customMarkerOptions
    );
    const marker = new kakao.maps.Marker({
      map: mapInstanceRef.current,
      position: position,
      image: customMarkerImage,
    });
    apiMarkersRef.current.push(marker);

    // 지도 이동: panTo를 약간 지연시켜 자연스러운 애니메이션 효과를 부여합니다.
    setTimeout(() => {
      mapInstanceRef.current.panTo(position);
      // 지도 이동 후 오버레이 생성
      const overlayContent = ReactDOMServer.renderToString(
        <OverlayContent
          index={0}
          title={site.title}
          imageSrc={site.firstimage || ""}
          mapLink={`http://localhost:8001/sight/${site.id}`}
        />
      );
      const overlay = new kakao.maps.CustomOverlay({
        content: overlayContent,
        map: mapInstanceRef.current,
        position: position,
      });
      currentOverlayRef.current = overlay;
    }, 200);

    // 드롭다운 및 검색창 클리어
    setSearchResults([]);
    setSearchQuery("");
  };

  /** 지도 초기화 **/
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const options = {
      center: new kakao.maps.LatLng(37.45687, 126.705345),
      level: 8,
      draggable: true,
    };

    const map = new kakao.maps.Map(mapContainerRef.current, options);
    mapInstanceRef.current = map;
    map.setDraggable(true);

    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    const displayMarker = (locPosition: any) => {
      new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });
      map.setCenter(locPosition);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const locPosition = new kakao.maps.LatLng(lat, lon);
        displayMarker(locPosition);
      });
    } else {
      const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
      displayMarker(locPosition);
    }

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
        map.panBy(deltaX, deltaY);
        startX = touch.clientX;
        startY = touch.clientY;
        e.preventDefault();
      };

      const handleTouchEnd = () => {
        startX = null;
        startY = null;
      };

      container?.addEventListener("touchstart", handleTouchStart);
      container?.addEventListener("touchmove", handleTouchMove);
      container?.addEventListener("touchend", handleTouchEnd);

      return () => {
        container?.removeEventListener("touchstart", handleTouchStart);
        container?.removeEventListener("touchmove", handleTouchMove);
        container?.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, []);

  /** 오른쪽 하단 현재 위치 이동 버튼 **/
  const goToCurrentPosition = () => {
    if (!mapInstanceRef.current) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const locPosition = new kakao.maps.LatLng(lat, lon);
        mapInstanceRef.current.setCenter(locPosition);
      });
    } else {
      alert("이 브라우저에서는 현재 위치를 가져올 수 없습니다.");
    }
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        {/* 지도 컨테이너 */}
        <div id="map" ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
        {/* 화면 중앙 상단의 검색바 */}
        <SearchBarContainer>
          <SearchInputWrapper>
            <SearchInput
              placeholder="🔍 행사, 관광지 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // 엔터 키: 전체 검색 결과로 마커 표시 (기능1)
                  handleSearchMarkers();
                }
              }}
            />
            {searchQuery && (
              <ClearButton onClick={() => setSearchQuery("")}>
                <FiX size={18} />
              </ClearButton>
            )}
          </SearchInputWrapper>
        </SearchBarContainer>
        {/* 드롭다운 목록 (기능2) */}
        {searchResults.length > 0 && (
          <DropdownContainer>
            {searchResults.map((site) => (
              <DropdownItem key={site.id} onClick={() => handleSelectResult(site)}>
                {site.title}
              </DropdownItem>
            ))}
          </DropdownContainer>
        )}
        {/* 오른쪽 하단 현재 위치 이동 버튼 */}
        <CurrentLocationButton onClick={goToCurrentPosition}>
          <CiLocationArrow1 size={24} />
        </CurrentLocationButton>
        {/* 중앙 하단 "현재 위치에서 검색" 버튼 */}
        <SearchFromCurrentLocationButton
          onClick={async () => {
            if (!mapInstanceRef.current) return;
            const bounds = mapInstanceRef.current.getBounds();
            const sw = bounds.getSouthWest();
            const ne = bounds.getNorthEast();
            const apiUrl = `/api/v1/sights/map?minLat=${sw.getLat()}&maxLat=${ne.getLat()}&minLng=${sw.getLng()}&maxLng=${ne.getLng()}`;
            try {
              const response = await fetch(apiUrl);
              if (!response.ok) throw new Error("API 요청 실패");
              const sightsData = await response.json();
              apiMarkersRef.current.forEach((marker) => marker.setMap(null));
              apiMarkersRef.current = [];
              const customMarkerSize = new kakao.maps.Size(30, 30);
              const customMarkerOptions = { offset: new kakao.maps.Point(20, 0) };
              const customMarkerImage = new kakao.maps.MarkerImage(
                customMarkerImageSrc,
                customMarkerSize,
                customMarkerOptions
              );
              sightsData.forEach((site: any, idx: number) => {
                const position = new kakao.maps.LatLng(site.mapy, site.mapx);
                const marker = new kakao.maps.Marker({
                  map: mapInstanceRef.current,
                  position: position,
                  image: customMarkerImage,
                });
                kakao.maps.event.addListener(marker, "click", function () {
                  if (currentOverlayRef.current) {
                    currentOverlayRef.current.setMap(null);
                  }
                  const overlayContent = ReactDOMServer.renderToString(
                    <OverlayContent
                      index={idx}
                      title={site.title}
                      imageSrc={site.firstimage || ""}
                      mapLink={`http://localhost:8001/sight/${site.id}`}
                    />
                  );
                  const overlay = new kakao.maps.CustomOverlay({
                    content: overlayContent,
                    map: mapInstanceRef.current,
                    position: position,
                  });
                  currentOverlayRef.current = overlay;
                  setTimeout(() => {
                    const closeBtn = document.getElementById(`closeBtn_${idx}`);
                    if (closeBtn) {
                      const closeOverlay = () => {
                        overlay.setMap(null);
                        currentOverlayRef.current = null;
                      };
                      closeBtn.addEventListener("click", closeOverlay);
                      closeBtn.addEventListener("touchend", closeOverlay);
                    }
                  }, 0);
                });
                apiMarkersRef.current.push(marker);
              });
            } catch (error) {
              console.error("관광지 데이터를 가져오는 중 에러 발생:", error);
            }
          }}
        >
          <FiRefreshCw size={18} style={{ marginRight: "8px" }} />
          현재 위치에서 검색
        </SearchFromCurrentLocationButton>
      </div>
      <FixedNavbarWrapper>
        <BottomNavbar paddingBottom={false} />
      </FixedNavbarWrapper>
    </>
  );
};

export default Map;
