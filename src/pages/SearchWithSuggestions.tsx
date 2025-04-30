import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import debounce from "lodash.debounce"; // npm i lodash.debounce

const SearchWithSuggestions: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState<Sight[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  type Sight = {
    id: number;
    title: string;
    addr1: string;
    addr2: string | null;
    dist: number;
    firstimage: string | null;
    firstimage2: string | null;
    mapx: number;
    mapy: number;
    tel: string | null;
  };
  const fetchSuggestions = async (query: string) => {
    try {
      const response = await axios.get(`/api/v1/sights/title/${query}`);
      if (Array.isArray(response.data)) {
        setSuggestions(response.data);
        setShowDropdown(true);
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  // 디바운스 적용된 함수
  const debouncedFetch = debounce((value: string) => {
    if (value.trim()) fetchSuggestions(value);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedFetch(value);
  };

  const handleSelect = (suggestion: string) => {
    setSearchInput(suggestion);
    setShowDropdown(false);
    alert(`선택한 관광지는: ${suggestion}`);
  };

  return (
    <SearchContainer>
      <SearchInput
        value={searchInput}
        onChange={handleChange}
        placeholder="관광지를 검색해보세요"
        onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)} // 자동 닫힘
      />
      {showDropdown && (
        <Dropdown>
          {suggestions.map((item) => (
            <DropdownItem key={item.id} onClick={() => handleSelect(item.title)}>
              {item.title}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </SearchContainer>
  );
};

export default SearchWithSuggestions;

const SearchContainer = styled.div`
  position: relative;
  width: 70%;
  box-sizing: border-box;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const Dropdown = styled.ul`
  width: 105%;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%; // 추가
  z-index: 10;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;

  border-top: none;
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box; // 추가
  border-radius: 10px;
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
