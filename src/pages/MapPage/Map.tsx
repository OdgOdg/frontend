/*global kakao*/
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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

const Map: React.FC = () => {
  const navigate = useNavigate();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const apiMarkersRef = useRef<any[]>([]);
  const currentOverlayRef = useRef<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // 자동완성 API 호출
  const handleAutoComplete = async () => {
    if (!searchQuery.trim() || !mapInstanceRef.current) {
      setSearchResults([]);
      return;
    }
    const encoded = encodeURIComponent(searchQuery.trim());
    try {
      const res = await fetch(`/api/v1/sights/title/${encoded}`);
      if (!res.ok) throw new Error();
      const results = await res.json();
      setSearchResults(results);
    } catch {
      console.error("자동완성 실패");
    }
  };

  useEffect(() => {
    const t = setTimeout(handleAutoComplete, 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // “검색” 버튼 클릭 시 마커 렌더 + 오버레이
  const handleSearchMarkers = async () => {
    if (!searchQuery.trim() || !mapInstanceRef.current) return;
    const encoded = encodeURIComponent(searchQuery.trim());
    try {
      const res = await fetch(`/api/v1/sights/title/${encoded}`);
      if (!res.ok) throw new Error();
      const results = await res.json();

      // 기존 마커/오버레이 정리
      apiMarkersRef.current.forEach((m) => m.setMap(null));
      apiMarkersRef.current = [];
      currentOverlayRef.current?.setMap(null);

      const size = new kakao.maps.Size(30, 30);
      const opts = { offset: new kakao.maps.Point(20, 0) };

      results.forEach((site: any, idx: number) => {
        const pos = new kakao.maps.LatLng(site.mapy, site.mapx);
        const imgSrc = site.category === 2 ? FestivalImageSrc : customMarkerImageSrc;
        const markerImage = new kakao.maps.MarkerImage(imgSrc, size, opts);
        const marker = new kakao.maps.Marker({
          map: mapInstanceRef.current,
          position: pos,
          image: markerImage,
        });

        kakao.maps.event.addListener(marker, "click", () => {
          // 기존 오버레이 제거
          currentOverlayRef.current?.setMap(null);

          // HTML 문자열 생성
          const titleShort = site.title.length > 10 ? site.title.slice(0, 10) + "…" : site.title;
          const closeId = `close_${idx}`;
          const detailId = `detailBtn_${idx}`;
          const html = `
            <div style="
              width:180px;
              border:1px solid #ccc;
              border-bottom:2px solid #ddd;
              border-radius:5px;
              overflow:hidden;
              background:#fff;
            ">
              <div style="
                position:relative;
                padding:4px 8px;
                background:#eee;
                border-bottom:1px solid #ddd;
                font-size:14px;
                font-weight:bold;
                white-space:nowrap;
                text-overflow:ellipsis;
                overflow:hidden;
              ">
                ${titleShort}
                <span id="${closeId}" style="
                  position:absolute;
                  top:5px;
                  right:8px;
                  width:17px;
                  height:17px;
                  cursor:pointer;
                  background:url('http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png') no-repeat center;
                "></span>
              </div>
              <div style="display:flex;padding:5px;">
                <img
                  src="${site.firstimage || ""}"
                  alt=""
                  style="width:70px;height:70px;border-radius:3px;flex-shrink:0;"
                />
                <div style="
                  display:flex;
                  flex-direction:column;
                  justify-content:center;
                  width:100%;
                  text-align:center;
                ">
                  <button id="${detailId}" style="
                    width:85%;
                    margin:10px auto;
                    padding:5px;
                    border:none;
                    background-color:#00aa5b;
                    color:white;
                    border-radius:100px;
                    cursor:pointer;
                    font-size:14px;
                    font-weight:600;
                  ">
                    상세 정보
                  </button>
                  <a
                    href="https://map.kakao.com/?map_type=TYPE_MAP&itemId=11376334&q=%EC%9D%B8%EC%B2%9C%EB%8C%80%ED%95%99%EA%B5%90+%EC%86%A1%EB%8F%84%EC%BA%A0%ED%8D%BC%EC%8A%A4&urlLevel=3&urlX=419125&urlY=1077250"
                    target="_blank"
                    style="color:#5085bb;text-decoration:none;font-size:14px;"
                  >
                    카카오맵 이동
                  </a>
                </div>
              </div>
            </div>
          `;

          const overlay = new kakao.maps.CustomOverlay({
            content: html,
            map: mapInstanceRef.current,
            position: pos,
          });
          currentOverlayRef.current = overlay;

          // DOM 붙은 뒤 이벤트 연결
          setTimeout(() => {
            document.getElementById(closeId)?.addEventListener("click", () => {
              overlay.setMap(null);
              currentOverlayRef.current = null;
            });
            document.getElementById(detailId)?.addEventListener("click", () => {
              navigate("/detailedview");
            });
          }, 0);
        });

        apiMarkersRef.current.push(marker);
      });

      setSearchResults([]);
      setSearchQuery("");
    } catch (e) {
      console.error("검색 마커 생성 중 오류", e);
    }
  };

  // 드롭다운 클릭 시 포지션 + 오버레이
  const handleSelectResult = (site: any) => {
    apiMarkersRef.current.forEach((m) => m.setMap(null));
    apiMarkersRef.current = [];
    currentOverlayRef.current?.setMap(null);

    const pos = new kakao.maps.LatLng(site.mapy, site.mapx);
    const size = new kakao.maps.Size(30, 30);
    const opts = { offset: new kakao.maps.Point(20, 0) };
    const imgSrc = site.category === 2 ? FestivalImageSrc : customMarkerImageSrc;
    const markerImage = new kakao.maps.MarkerImage(imgSrc, size, opts);

    const marker = new kakao.maps.Marker({
      map: mapInstanceRef.current,
      position: pos,
      image: markerImage,
    });
    apiMarkersRef.current.push(marker);

    setTimeout(() => {
      mapInstanceRef.current.panTo(pos);

      // overlay 생성 (idx 대신 "select" 식별자 사용)
      const titleShort = site.title.length > 10 ? site.title.slice(0, 10) + "…" : site.title;
      const closeId = `close_select`;
      const detailId = `detailBtn_select`;
      const html = `
        <div style="
          width:180px;
          border:1px solid #ccc;
          border-bottom:2px solid #ddd;
          border-radius:5px;
          overflow:hidden;
          background:#fff;
        ">
          <div style="
            position:relative;
            padding:4px 8px;
            background:#eee;
            border-bottom:1px solid #ddd;
            font-size:14px;
            font-weight:bold;
            white-space:nowrap;
            text-overflow:ellipsis;
            overflow:hidden;
          ">
            ${titleShort}
            <span id="${closeId}" style="
              position:absolute;
              top:5px;
              right:8px;
              width:17px;
              height:17px;
              cursor:pointer;
              background:url('http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png') no-repeat center;
            "></span>
          </div>
          <div style="display:flex;padding:5px;">
            <img
              src="${site.firstimage || ""}"
              alt=""
              style="width:70px;height:70px;border-radius:3px;flex-shrink:0;"
            />
            <div style="
              display:flex;
              flex-direction:column;
              justify-content:center;
              width:100%;
              text-align:center;
            ">
              <button id="${detailId}" style="
                width:85%;
                margin:10px auto;
                padding:5px;
                border:none;
                background-color:#00aa5b;
                color:white;
                border-radius:100px;
                cursor:pointer;
                font-size:14px;
                font-weight:600;
              ">
                상세 정보
              </button>
              <a
                href="https://map.kakao.com/?map_type=TYPE_MAP&itemId=11376334&q=%EC%9D%B8%EC%B2%9C%EB%8C%80%ED%95%99%EA%B5%90+%EC%86%A1%EB%8F%84%EC%BA%A0%ED%8D%BC%EC%8A%A4&urlLevel=3&urlX=419125&urlY=1077250"
                target="_blank"
                style="color:#5085bb;text-decoration:none;font-size:14px;"
              >
                카카오맵 이동
              </a>
            </div>
          </div>
        </div>
      `;

      const overlay = new kakao.maps.CustomOverlay({
        content: html,
        map: mapInstanceRef.current,
        position: pos,
      });
      currentOverlayRef.current = overlay;

      setTimeout(() => {
        document.getElementById(closeId)?.addEventListener("click", () => {
          overlay.setMap(null);
          currentOverlayRef.current = null;
        });
        document.getElementById(detailId)?.addEventListener("click", () => {
          navigate("/detailedview");
        });
      }, 0);
    }, 200);

    setSearchResults([]);
    setSearchQuery("");
  };

  // 초기 맵 생성
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const map = new kakao.maps.Map(mapContainerRef.current, {
      center: new kakao.maps.LatLng(37.45687, 126.705345),
      level: 8,
      draggable: true,
    });
    mapInstanceRef.current = map;
    map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);

    // 처음 한 번 현재 위치 마커 표시
    const display = (loc: any) => {
      new kakao.maps.Marker({ map, position: loc });
      map.setCenter(loc);
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => {
        display(new kakao.maps.LatLng(p.coords.latitude, p.coords.longitude));
      });
    } else {
      display(new kakao.maps.LatLng(33.450701, 126.570667));
    }

    // 모바일 터치 드래그 지원
    if ("ontouchstart" in window && mapContainerRef.current) {
      const container = mapContainerRef.current;
      let startX: number | null = null;
      let startY: number | null = null;

      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
        }
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (startX === null || startY === null) return;
        const moveX = e.touches[0].clientX;
        const moveY = e.touches[0].clientY;
        map.panBy(startX - moveX, startY - moveY);
        startX = moveX;
        startY = moveY;
        e.preventDefault();
      };

      const handleTouchEnd = () => {
        startX = null;
        startY = null;
      };

      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleTouchMove);
      container.addEventListener("touchend", handleTouchEnd);

      // clean-up
      return () => {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, []);

  // 현재 위치로 이동 함수
  const goToCurrentPosition = () => {
    if (!mapInstanceRef.current) return;

    // 역시 삼항 대신 if/else
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => {
        mapInstanceRef.current.setCenter(new kakao.maps.LatLng(p.coords.latitude, p.coords.longitude));
      });
    } else {
      alert("현재 위치를 가져올 수 없습니다.");
    }
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <div id="map" ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />

        <SearchBarContainer>
          <SearchInputWrapper>
            <SearchInput
              placeholder="🔍 행사, 관광지 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchMarkers()}
            />
            {searchQuery && (
              <ClearButton onClick={() => setSearchQuery("")}>
                <FiX size={18} />
              </ClearButton>
            )}
          </SearchInputWrapper>
        </SearchBarContainer>

        {searchResults.length > 0 && (
          <DropdownContainer>
            {searchResults.map((site) => (
              <DropdownItem key={site.id} onClick={() => handleSelectResult(site)}>
                {site.title}
              </DropdownItem>
            ))}
          </DropdownContainer>
        )}

        <CurrentLocationButton onClick={goToCurrentPosition}>
          <CiLocationArrow1 size={24} />
        </CurrentLocationButton>

        <SearchFromCurrentLocationButton
          onClick={async () => {
            const map = mapInstanceRef.current;
            if (!map) return;

            // 1. 지도 영역(bounds) 정보 가져오기
            const bounds = map.getBounds();
            const sw = bounds.getSouthWest();
            const ne = bounds.getNorthEast();

            // 2. API 호출: 현재 화면에 보이는 영역 내의 관광지/행사 조회
            try {
              const res = await fetch(
                `/api/v1/sights/map?minLat=${sw.getLat()}&maxLat=${ne.getLat()}&minLng=${sw.getLng()}&maxLng=${ne.getLng()}`
              );
              if (!res.ok) throw new Error("API 요청 실패");
              const results = await res.json();

              // 3. 기존 마커·오버레이 제거
              apiMarkersRef.current.forEach((m) => m.setMap(null));
              apiMarkersRef.current = [];
              currentOverlayRef.current?.setMap(null);

              // 4. 마커 이미지 설정
              const size = new kakao.maps.Size(30, 30);
              const opts = { offset: new kakao.maps.Point(20, 0) };

              // 5. 결과 반복 처리
              results.forEach((site: any, idx: number) => {
                const pos = new kakao.maps.LatLng(site.mapy, site.mapx);
                const imgSrc = site.category === 2 ? FestivalImageSrc : customMarkerImageSrc;
                const markerImage = new kakao.maps.MarkerImage(imgSrc, size, opts);
                const marker = new kakao.maps.Marker({
                  map,
                  position: pos,
                  image: markerImage,
                });

                // 6. 마커 클릭 시 오버레이 생성
                kakao.maps.event.addListener(marker, "click", () => {
                  // 기존 오버레이 제거
                  currentOverlayRef.current?.setMap(null);

                  // HTML 문자열로 오버레이 내용 생성
                  const titleShort = site.title.length > 10 ? site.title.slice(0, 10) + "…" : site.title;
                  const closeId = `close_map_${idx}`;
                  const detailId = `detail_map_${idx}`;
                  const html = `
            <div style="
              width:180px;
              border:1px solid #ccc;
              border-bottom:2px solid #ddd;
              border-radius:5px;
              overflow:hidden;
              background:#fff;
            ">
              <div style="
                position:relative;
                padding:4px 8px;
                background:#eee;
                border-bottom:1px solid #ddd;
                font-size:14px;
                font-weight:bold;
                white-space:nowrap;
                text-overflow:ellipsis;
                overflow:hidden;
              ">
                ${titleShort}
                <span id="${closeId}" style="
                  position:absolute;
                  top:5px;
                  right:8px;
                  width:17px;
                  height:17px;
                  cursor:pointer;
                  background:url('http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png') no-repeat center;
                "></span>
              </div>
              <div style="display:flex;padding:5px;">
                <img
                  src="${site.firstimage || ""}"
                  alt=""
                  style="width:70px;height:70px;border-radius:3px;flex-shrink:0;"
                />
                <div style="
                  display:flex;
                  flex-direction:column;
                  justify-content:center;
                  width:100%;
                  text-align:center;
                ">
                  <button id="${detailId}" style="
                    width:85%;
                    margin:10px auto;
                    padding:5px;
                    border:none;
                    background-color:#00aa5b;
                    color:white;
                    border-radius:100px;
                    cursor:pointer;
                    font-size:14px;
                    font-weight:600;
                  ">
                    상세 정보
                  </button>
                  <a
                    href="https://map.kakao.com/?map_type=TYPE_MAP&itemId=11376334&q=%EC%9D%B8%EC%B2%9C%EB%8C%80%ED%95%99%EA%B5%90+%EC%86%A1%EB%8F%84%EC%BA%A0%ED%8D%BC%EC%8A%A4&urlLevel=3&urlX=419125&urlY=1077250"
                    target="_blank"
                    style="color:#5085bb;text-decoration:none;font-size:14px;"
                  >
                    카카오맵 이동
                  </a>
                </div>
              </div>
            </div>
          `;

                  const overlay = new kakao.maps.CustomOverlay({
                    content: html,
                    map,
                    position: pos,
                  });
                  currentOverlayRef.current = overlay;

                  // 7. DOM 마운트 후 이벤트 바인딩
                  setTimeout(() => {
                    document.getElementById(closeId)?.addEventListener("click", () => {
                      overlay.setMap(null);
                      currentOverlayRef.current = null;
                    });
                    document.getElementById(detailId)?.addEventListener("click", () => {
                      navigate(`/detailedview/${site.id}`, {
                        state: {
                          id: site.id,
                          title: site.title,
                          addr1: site.addr1,
                          firstimage: site.firstimage,
                          category: site.category,
                        },
                      });
                    });
                  });
                });

                apiMarkersRef.current.push(marker);
              });
            } catch (e) {
              console.error("현재 위치 기반 검색 중 오류:", e);
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
