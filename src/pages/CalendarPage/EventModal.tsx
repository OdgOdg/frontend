import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { useNavigate } from "react-router-dom";

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
  &:hover {
    opacity: 0.9;
  }
`;

interface CalendarEvent {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  memo: string;
  isOrigin: boolean;
  isAllday: boolean;
}

interface EventModalProps {
  event: CalendarEvent;
  selectedDate: Date | null;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, selectedDate, onClose }) => {
  const navigate = useNavigate();

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalDate>{selectedDate ? `${format(selectedDate, "MM-dd")} 일정` : ""}</ModalDate>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <ModalBody>
          <div>
            <strong>😄 일정 제목:</strong> {event.title}
          </div>
          <div>
            <strong>🕜 일정 시작:</strong>{" "}
            {event.isAllday
              ? formatInTimeZone(new Date(event.startDate), "Asia/Seoul", "yyyy-MM-dd")
              : formatInTimeZone(new Date(event.startDate), "Asia/Seoul", "yyyy-MM-dd HH:mm")}
          </div>
          <div>
            <strong>🕙 일정 종료:</strong>{" "}
            {event.isAllday
              ? formatInTimeZone(new Date(event.endDate), "Asia/Seoul", "yyyy-MM-dd")
              : formatInTimeZone(new Date(event.endDate), "Asia/Seoul", "yyyy-MM-dd HH:mm")}
          </div>

          <div>
            <strong>📜 일정 메모:</strong> {event.memo}
          </div>
        </ModalBody>
        <ModalFooter>
          <EditButton
            onClick={() => {
              onClose();
              navigate("/updateschedule", { state: event });
            }}
          >
            일정 편집
          </EditButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EventModal;
