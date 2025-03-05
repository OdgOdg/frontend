import React, { useState, useEffect } from "react";
import styled from "styled-components";

/* styled-components */

const Container = styled.div`
  width: 90%;
  padding: 16px;
  margin: 0 auto;
  overflow: auto;
`;

const Title = styled.h2`
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #ababab;
`;

const Select = styled.select`
  width: 40%;
  padding: 5px;
  font-size: 14px;
  border: 1px solid black;
  border-radius: 5px;
`;

const CheckboxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
`;

const CheckboxInput = styled.input`
  transform: scale(1.2);
`;

const SubmitButton = styled.button`
  width: 60%;
  padding: 10px;
  font-size: 18px;
  color: white;
  background-color: #00aa5b;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  &:hover {
    opacity: 0.9;
  }
`;

/* ------------------------- Component & Types ------------------------- */

const options = {
  gender: ["MAN", "WOMEN"],
  age: ["24세", "25세", "26세", "27세"],
  season: ["봄 🌱", "여름 ☀️", "가을 🍂", "겨울 ❄️"],
  type: ["산 🌲", "공원 🌊", "바다 🏝️", "행사/축제 🎈", "문화유적 ⛩️", "실내 🏛️", "액티비티 🎭", "실외 ⛺"],
  together: ["아이와 함께 👶", "친구와 함께 👫", "연인과 함께 💑", "부모님과 함께 👨‍👩‍👧‍👦"],
};

const SurveyForm: React.FC = () => {
  // index.css line9 => "padding-bottom:60px" 스타일 미적용을 위한 useEffect
  useEffect(() => {
    const originalPadding = document.body.style.paddingBottom;
    document.body.style.paddingBottom = "0px";

    return () => {
      document.body.style.paddingBottom = originalPadding;
    };
  }, []);

  const [formData, setFormData] = useState({
    gender: "",
    age: "24세",
    season: new Set<string>(),
    type: new Set<string>(),
    together: new Set<string>(),
  });

  const handleCheckboxChange = (category: "season" | "type" | "together", value: string) => {
    setFormData((prev) => {
      const updatedSet = new Set(prev[category]);
      updatedSet.has(value) ? updatedSet.delete(value) : updatedSet.add(value);
      return { ...prev, [category]: updatedSet };
    });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
  };

  return (
    <Container>
      <Title>
        사전조사 정보를 입력하고<br></br> 나에게 맞는 행사 및 관광지를 추천받으세요!
      </Title>

      {/* GENDER */}
      <Section>
        <Label>GENDER</Label>
        <CheckboxContainer>
          {options.gender.map((item) => (
            <CheckboxLabel key={item}>
              <CheckboxInput
                type="radio"
                name="gender"
                checked={formData.gender === item}
                onChange={() => setFormData((prev) => ({ ...prev, gender: item }))}
              />
              {item}
            </CheckboxLabel>
          ))}
        </CheckboxContainer>
      </Section>

      {/* AGE */}
      <Section>
        <Label>AGE</Label>
        <Select value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })}>
          {options.age.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </Section>

      {/* SEASON */}
      <Section>
        <Label>SEASON</Label>
        <CheckboxContainer>
          {options.season.map((item) => (
            <CheckboxLabel key={item}>
              <CheckboxInput
                type="checkbox"
                checked={formData.season.has(item)}
                onChange={() => handleCheckboxChange("season", item)}
              />
              {item}
            </CheckboxLabel>
          ))}
        </CheckboxContainer>
      </Section>

      {/* TYPE */}
      <Section>
        <Label>TYPE</Label>
        <CheckboxContainer>
          {options.type.map((item) => (
            <CheckboxLabel key={item}>
              <CheckboxInput
                type="checkbox"
                checked={formData.type.has(item)}
                onChange={() => handleCheckboxChange("type", item)}
              />
              {item}
            </CheckboxLabel>
          ))}
        </CheckboxContainer>
      </Section>

      {/* TOGETHER */}
      <Section>
        <Label>TOGETHER</Label>
        <CheckboxContainer>
          {options.together.map((item) => (
            <CheckboxLabel key={item}>
              <CheckboxInput
                type="checkbox"
                checked={formData.together.has(item)}
                onChange={() => handleCheckboxChange("together", item)}
              />
              {item}
            </CheckboxLabel>
          ))}
        </CheckboxContainer>
      </Section>

      {/* SUBMIT BUTTON */}
      <SubmitButton onClick={handleSubmit}>제출 하기</SubmitButton>
    </Container>
  );
};

export default SurveyForm;
