import React, { useState, FormEvent } from "react";
import styled from "styled-components";
import BottomNavbar from "../../components/BottomNavbar";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* ---------------------------- Styled Components ---------------------------- */

const Container = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin: 0 auto;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
`;

const TextInput = styled.input`
  width: 90%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
  &:focus {
    outline: none;
    border-color: #999;
  }
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
`;

const ToggleLabel = styled.label`
  display: inline-block;
  width: 50px;
  height: 28px;
  position: relative;
  margin-right: 8px;
`;

const ToggleCheckbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #00aa5b;
  }

  &:checked + span:before {
    transform: translateX(22px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 34px;
  transition: 0.4s;

  &:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }
`;

const DateTimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 16px;
`;

const DateTimeInput = styled.input`
  width: 45%;
  padding: 10px;
  font-size: 13px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #999;
  }
`;

const TextArea = styled.textarea`
  width: 90%;
  height: 80px;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  margin-bottom: 16px;
  &:focus {
    outline: none;
    border-color: #999;
  }
`;

const SaveButton = styled.button`
  width: 60%;
  padding: 12px;
  font-size: 18px;
  background-color: #00aa5b;
  color: white;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  display: block;
  margin: 15px auto;
  &:hover {
    opacity: 0.9;
  }
`;

/* ------------------------- Component & Types ------------------------- */

interface AddScheduleProps {
  // 필요하다면 부모 컴포넌트로부터 내려받을 props 정의
}

interface FormData {
  title: string;
  isAllDay: boolean;
  startDateTime: string;
  endDateTime: string;
  memo: string;
}

const AddSchedule: React.FC<AddScheduleProps> = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    isAllDay: false,
    startDateTime: "",
    endDateTime: "",
    memo: "",
  });

  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let val: string | boolean = value;
    if (type === "checkbox") {
      val = (e.target as HTMLInputElement).checked;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 제목 입력값이 없을 경우
    if (!formData.title.trim()) {
      alert("일정 제목을 입력해주세요!");
      return;
    }

    // 날짜 입력값이 없을 경우
    if (!formData.startDateTime || !formData.endDateTime) {
      alert("일정 날짜를 입력해주세요!");
      return;
    }

    const requestBody = {
      title: formData.title,
      startDate: new Date(formData.startDateTime).toISOString(),
      endDate: new Date(formData.endDateTime).toISOString(),
      memo: formData.memo,
      isAllday: formData.isAllDay, // 토글이 활성화되어 있으면 true, 아니면 false
      isOrigin: false, // 항상 false로 전송
    };

    try {
      const response = await axios.post("/api/v1/events", requestBody);
      console.log("저장 성공:", response.data);
      alert("일정이 성공적으로 저장되었습니다!");

      // 저장 성공 후 이전 페이지로 이동
      navigate(-1);
    } catch (error) {
      console.error("저장 오류:", error);
      alert("일정 저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <Header title="일정 추가" />
      <Container>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="title">일정 제목</Label>
          <TextInput
            id="title"
            name="title"
            placeholder="일정을 입력하세요"
            value={formData.title}
            onChange={handleChange}
          />

          <ToggleWrapper>
            <span>하루 종일 🕒</span>
            <ToggleLabel>
              <ToggleCheckbox type="checkbox" name="isAllDay" checked={formData.isAllDay} onChange={handleChange} />
              <ToggleSlider />
            </ToggleLabel>
          </ToggleWrapper>

          <DateTimeContainer>
            <DateTimeInput
              type={formData.isAllDay ? "date" : "datetime-local"}
              name="startDateTime"
              value={formData.startDateTime}
              onChange={handleChange}
            />
            <DateTimeInput
              type={formData.isAllDay ? "date" : "datetime-local"}
              name="endDateTime"
              value={formData.endDateTime}
              onChange={handleChange}
            />
          </DateTimeContainer>

          <Label htmlFor="memo">메모 📜</Label>
          <TextArea
            id="memo"
            name="memo"
            placeholder="메모를 입력하세요"
            value={formData.memo}
            onChange={handleChange}
          />

          <SaveButton type="submit">저장하기</SaveButton>
        </form>
      </Container>
      <BottomNavbar paddingBottom={false} />
    </>
  );
};

export default AddSchedule;
