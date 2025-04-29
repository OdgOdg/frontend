import React from "react";
import styled, { keyframes } from "styled-components";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { useNavigate } from "react-router-dom";

interface CalendarEvent {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  memo: string;
  isOrigin: boolean;
  isAllday: boolean;
  isFestival?: boolean;
  addr1?: string;
}

interface EventModalProps {
  event: CalendarEvent;
  selectedDate: Date | null;
  onClose: () => void;
}

// 애니메이션 keyframes
const slideDown = keyframes`
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  width: 90%;
  max-width: 390px;
  border-radius: 8px;
  padding: 1rem;
  position: relative;
  animation: ${slideDown} 0.3s ease-out;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 3px dashed #929292;
`;

const ModalDate = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
`;

const ModalBody = styled.div`
  margin-top: 1rem;
  line-height: 2;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

const EditButton = styled.button`
  background-color: #00aa5b;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover { opacity: 0.9; }
`;

const EventModal: React.FC<EventModalProps> = ({ event, selectedDate, onClose }) => {
  const navigate = useNavigate();

  const parseDateString = (dateStr: string): Date => {
    if (event.isFestival) {
      const y = Number(dateStr.slice(0, 4));
      const m = Number(dateStr.slice(4, 6)) - 1;
      const d = Number(dateStr.slice(6, 8));
      return new Date(y, m, d);
    }
    return new Date(dateStr);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalDate>
            {selectedDate
              ? `${format(selectedDate, "MM-dd")} ${event.isFestival ? "축제" : "일정"}`
              : ""}
          </ModalDate>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <ModalBody>
          <div>
            <strong>{event.isFestival ? "🎈 축제 제목:" : "😄 일정 제목:"}</strong> {event.title}
          </div>
          <div>
            <strong>{event.isFestival ? "🕜 축제 시작일:" : "🕜 일정 시작:"}</strong> {event.isAllday
              ? formatInTimeZone(parseDateString(event.startDate), "Asia/Seoul", "yyyy-MM-dd")
              : formatInTimeZone(parseDateString(event.startDate), "Asia/Seoul", "yyyy-MM-dd HH:mm")}
          </div>
          <div>
            <strong>{event.isFestival ? "🕙 축제 종료일:" : "🕙 일정 종료:"}</strong> {event.isAllday
              ? formatInTimeZone(parseDateString(event.endDate), "Asia/Seoul", "yyyy-MM-dd")
              : formatInTimeZone(parseDateString(event.endDate), "Asia/Seoul", "yyyy-MM-dd HH:mm")}
          </div>
          {event.isFestival ? (
            <div><strong>🗺 축제 위치:</strong> {event.addr1}</div>
          ) : (
            <div><strong>📜 일정 메모:</strong> {event.memo}</div>
          )}
        </ModalBody>
        <ModalFooter>
          {!event.isFestival && (
            <EditButton
              onClick={() => { onClose(); navigate("/updateschedule", { state: event }); }}
            >일정 편집</EditButton>
          )}
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EventModal;
