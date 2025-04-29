/*global kakao*/
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ReactDOMServer from "react-dom/server";
import { CiLocationArrow1 } from "react-icons/ci";
import { FiRefreshCw, FiX } from "react-icons/fi";
import customMarkerImageSrc from "../../images/MapPage/마커이미지.png";
import FestivalImageSrc from "../../images/MapPage/축제이미지.png";
import BottomNavbar from "../../components/BottomNavbar";

declare const kakao: any;

/*--------------------- Styled Components ----------------------*/
const FixedNavbarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;
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
const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;
const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 40px 0 12px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  outline: none;
`;
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
const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  &:hover {
    background-color: #f0f0f0;
  }
`;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
}) => {
  // 제목이 10글자 초과 시 자르기
  const truncatedTitle =
    title.length > 10 ? `${title.slice(0, 10)}...` : title;
  return (
    <Wrap>
      <Info>
        <Title>
          {truncatedTitle}
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
};

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const apiMarkersRef = useRef<any[]>([]);
  const currentOverlayRef = useRef<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      handleAutoComplete();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchMarkers = async () => {
    if (!searchQuery.trim() || !mapInstanceRef.current) return;
    const encodedTitle = encodeURIComponent(searchQuery.trim());
    const apiUrl = `/api/v1/sights/title/${encodedTitle}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("API 요청 실패");
      const results = await response.json();
      apiMarkersRef.current.forEach((marker) => marker.setMap(null));
      apiMarkersRef.current = [];
      if (currentOverlayRef.current) {
        currentOverlayRef.current.setMap(null);
      }

      const customMarkerSize = new kakao.maps.Size(30, 30);
      const customMarkerOptions = { offset: new kakao.maps.Point(20, 0) };

      results.forEach((site: any, idx: number) => {
        const position = new kakao.maps.LatLng(site.mapy, site.mapx);
        const markerImageSrc = site.category === 2 ? FestivalImageSrc : customMarkerImageSrc;
        const customMarkerImage = new kakao.maps.MarkerImage(
          markerImageSrc,
          customMarkerSize,
          customMarkerOptions
        );
        const marker = new kakao.maps.Marker({
          map: mapInstanceRef.current,
          position,
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
            position,
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

      setSearchResults([]);
      setSearchQuery("");
    } catch (error) {
      console.error("전체 관광지 마커 검색 중 에러 발생:", error);
    }
  };

  const handleSelectResult = (site: any) => {
    apiMarkersRef.current.forEach((marker) => marker.setMap(null));
    apiMarkersRef.current = [];
    if (currentOverlayRef.current) {
      currentOverlayRef.current.setMap(null);
    }
    const position = new kakao.maps.LatLng(site.mapy, site.mapx);

    const customMarkerSize = new kakao.maps.Size(30, 30);
    const customMarkerOptions = { offset: new kakao.maps.Point(20, 0) };
    const markerImageSrc = site.category === 2 ? FestivalImageSrc : customMarkerImageSrc;
    const customMarkerImage = new kakao.maps.MarkerImage(
      markerImageSrc,
      customMarkerSize,
      customMarkerOptions
    );
    const marker = new kakao.maps.Marker({ map: mapInstanceRef.current, position, image: customMarkerImage });
    apiMarkersRef.current.push(marker);

    setTimeout(() => {
      mapInstanceRef.current.panTo(position);
      const overlayContent = ReactDOMServer.renderToString(
        <OverlayContent
          index={0}
          title={site.title}
          imageSrc={site.firstimage || ""}
          mapLink={`http://localhost:8001/sight/${site.id}`}
        />
      );
      const overlay = new kakao.maps.CustomOverlay({ content: overlayContent, map: mapInstanceRef.current, position });
      currentOverlayRef.current = overlay;
    }, 200);

    setSearchResults([]);
    setSearchQuery("");
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;
    const options = { center: new kakao.maps.LatLng(37.45687, 126.705345), level: 8, draggable: true };
    const map = new kakao.maps.Map(mapContainerRef.current, options);
    mapInstanceRef.current = map;
    map.setDraggable(true);
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    const displayMarker = (locPosition: any) => { new kakao.maps.Marker({ map, position: locPosition }); map.setCenter(locPosition); };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => displayMarker(new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude)));
    } else {
      displayMarker(new kakao.maps.LatLng(33.450701, 126.570667));
    }
    if ("ontouchstart" in window) {
      let startX: number | null = null;
      let startY: number | null = null;
      const container = mapContainerRef.current;
      const handleTouchStart = (e: TouchEvent) => { if (e.touches.length === 1) { startX = e.touches[0].clientX; startY = e.touches[0].clientY; } };
      const handleTouchMove = (e: TouchEvent) => { if (startX === null || startY === null) return; map.panBy(startX - e.touches[0].clientX, startY - e.touches[0].clientY); startX = e.touches[0].clientX; startY = e.touches[0].clientY; e.preventDefault(); };
      const handleTouchEnd = () => { startX = startY = null; };
      container?.addEventListener("touchstart", handleTouchStart);
      container?.addEventListener("touchmove", handleTouchMove);
      container?.addEventListener("touchend", handleTouchEnd);
      return () => { container?.removeEventListener("touchstart", handleTouchStart); container?.removeEventListener("touchmove", handleTouchMove); container?.removeEventListener("touchend", handleTouchEnd); };
    }
  }, []);

  const goToCurrentPosition = () => {
    if (!mapInstanceRef.current) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        mapInstanceRef.current.setCenter(new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude));
      });
    } else {
      alert("이 브라우저에서는 현재 위치를 가져올 수 없습니다.");
    }
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <div id="map" ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
        <SearchBarContainer>
          <SearchInputWrapper>
            <SearchInput placeholder="🔍 행사, 관광지 검색" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleSearchMarkers(); }} />
            {searchQuery && (<ClearButton onClick={() => setSearchQuery("")}> <FiX size={18} /> </ClearButton>)}
          </SearchInputWrapper>
        </SearchBarContainer>
        {searchResults.length > 0 && (<DropdownContainer>{searchResults.map((site) => (<DropdownItem key={site.id} onClick={() => handleSelectResult(site)}>{site.title}</DropdownItem>))}</DropdownContainer>)}
        <CurrentLocationButton onClick={goToCurrentPosition}><CiLocationArrow1 size={24} /></CurrentLocationButton>
        <SearchFromCurrentLocationButton onClick={async () => {
          if (!mapInstanceRef.current) return;
          const bounds = mapInstanceRef.current.getBounds();
          const sw = bounds.getSouthWest();
          const ne = bounds.getNorthEast();
          const apiUrl = `/api/v1/sights/map?minLat=${sw.getLat()}&maxLat=${ne.getLat()}&minLng=${sw.getLng()}&maxLng=${ne.getLng()}`;
          try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("API 요청 실패");
            const sightsData = await response.json();
            apiMarkersRef.current.forEach((marker) => marker.setMap(null)); apiMarkersRef.current = [];
            const customMarkerSize = new kakao.maps.Size(30, 30);
            const customMarkerOptions = { offset: new kakao.maps.Point(20, 0) };
            sightsData.forEach((site: any, idx: number) => {
              const position = new kakao.maps.LatLng(site.mapy, site.mapx);
              const markerImageSrc = site.category === 2 ? FestivalImageSrc : customMarkerImageSrc;
              const customMarkerImage = new kakao.maps.MarkerImage(markerImageSrc, customMarkerSize, customMarkerOptions);
              const marker = new kakao.maps.Marker({ map: mapInstanceRef.current, position, image: customMarkerImage });
              kakao.maps.event.addListener(marker, "click", function () {
                if (currentOverlayRef.current) currentOverlayRef.current.setMap(null);
                const overlayContent = ReactDOMServer.renderToString(<OverlayContent index={idx} title={site.title} imageSrc={site.firstimage || ""} mapLink={`http://localhost:8001/sight/${site.id}`} />);
                const overlay = new kakao.maps.CustomOverlay({ content: overlayContent, map: mapInstanceRef.current, position });
                currentOverlayRef.current = overlay;
                setTimeout(() => {
                  const closeBtn = document.getElementById(`closeBtn_${idx}`);
                  if (closeBtn) { const closeOverlay = () => { overlay.setMap(null); currentOverlayRef.current = null; }; closeBtn.addEventListener("click", closeOverlay); closeBtn.addEventListener("touchend", closeOverlay); }
                }, 0);
              });
              apiMarkersRef.current.push(marker);
            });
          } catch (error) {
            console.error("관광지 데이터를 가져오는 중 에러 발생:", error);
          }
        }}>
          <FiRefreshCw size={18} style={{ marginRight: "8px" }} /> 현재 위치에서 검색
        </SearchFromCurrentLocationButton>
      </div>
      <FixedNavbarWrapper>
        <BottomNavbar paddingBottom={false} />
      </FixedNavbarWrapper>
    </>
  );
};

export default Map;
