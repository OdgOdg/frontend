import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import ToggleMenu from "./EventToggle";
import { CiCirclePlus } from "react-icons/ci";
import { useSwipeable } from "react-swipeable";
import BottomNavbar from "../../components/BottomNavbar";
import { useNavigate } from "react-router-dom";
import EventModal from "./EventModal";
import axios from "axios";

// Styled-components
const CalendarContentWrapper = styled.div`
  position: relative;
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
`;

const MonthYearText = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
`;

const WeekdaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  padding: 0.5rem 0;
  font-weight: 600;
  background-color: #f9f9f9;
  border-top: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
`;

// transient prop: $isSunday
const WeekdayCell = styled.div<{ $isSunday?: boolean }>`
  color: ${({ $isSunday }) => ($isSunday ? "#EF0707" : "inherit")};
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: right;
  padding: 0;
  row-gap: 0;
  column-gap: 0;
`;

// transient props: $isCurrentMonth, $isToday, $isSelected
const DayCell = styled.div<{
  $isCurrentMonth?: boolean;
  $isToday?: boolean;
  $isSelected?: boolean;
}>`
  min-height: 80px;
  padding: 0.5rem;
  box-sizing: border-box;
  position: relative;
  border: 1px solid ${({ $isSelected }) => ($isSelected ? "black" : "#DDDDDD")};
  color: ${({ $isCurrentMonth }) => ($isCurrentMonth ? "#333" : "#bbb")};
  background-color: ${({ $isToday }) => ($isToday ? "#D9D9D9" : "transparent")};
  cursor: pointer;
`;

const EventWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  display: flex;
  flex-direction: column;
`;

// transient prop: $isOriginal
const EventTag = styled.div<{ $isOriginal?: boolean }>`
  background-color: ${({ $isOriginal }) => ($isOriginal ? "#00AA5B" : "#4771EC")};
  color: #fff;
  font-size: 0.7rem;
  padding: 0.2rem 0.4rem;
  margin-top: 0.3rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MoreTag = styled.div`
  background-color: #bbb;
  color: #fff;
  font-size: 0.7rem;
  padding: 0.2rem 0.4rem;
  margin-top: 0.3rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ToggleMenusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const FloatingButton = styled.button`
  position: absolute;
  bottom: -4rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: #00aa5b;
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 999;
  &:hover {
    opacity: 0.9;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const NavButton = styled.button`
  border: none;
  background: transparent;
  font-size: 1.2rem;
  cursor: pointer;
  color: #333;
  padding: 0.25rem;
`;

// 이벤트 데이터 타입

interface CalendarEvent {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  memo: string;
  isOrigin: boolean;
  isAllday: boolean;
}

interface CalendarProps {
  year: number;
  month: number;
}

const Calendar: React.FC<CalendarProps> = ({ year, month }) => {
  const navigate = useNavigate();

  // API에서 가져온 이벤트 상태
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date(year, month - 1, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalEvent, setModalEvent] = useState<CalendarEvent | null>(null);

  useEffect(() => {
    axios
      .get("/api/v1/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  // 날짜 비교 시 KST로 변환하여 비교 (UTC 문자열을 KST로 변환)
  const getEventsByDate = (date: Date) => {
    const formattedDate = formatInTimeZone(date, "Asia/Seoul", "yyyy-MM-dd");
    return events.filter((ev) => {
      const eventStart = formatInTimeZone(new Date(ev.startDate), "Asia/Seoul", "yyyy-MM-dd");
      const eventEnd = formatInTimeZone(new Date(ev.endDate), "Asia/Seoul", "yyyy-MM-dd");
      return formattedDate >= eventStart && formattedDate <= eventEnd;
    });
  };

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth, 0);
  const startWeekday = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();

  const daysArray: Date[] = [];
  for (let i = 0; i < startWeekday; i++) {
    daysArray.push(new Date(currentYear, currentMonth - 1, 1 - (startWeekday - i)));
  }
  for (let i = 1; i <= totalDays; i++) {
    daysArray.push(new Date(currentYear, currentMonth - 1, i));
  }
  const leftoverDays = 7 - (daysArray.length % 7);
  if (leftoverDays < 7) {
    for (let i = 1; i <= leftoverDays; i++) {
      daysArray.push(new Date(currentYear, currentMonth, i));
    }
  }

  const today = new Date();
  const checkIsToday = (date: Date) => {
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  const handleDayClick = (day: Date) => {
    if (selectedDate && selectedDate.getTime() === day.getTime()) {
      setSelectedDate(null);
    } else {
      setSelectedDate(day);
    }
  };

  const selectedEvents = selectedDate ? getEventsByDate(selectedDate) : [];
  const handleAddEvent = () => {
    navigate("/addschedule");
  };

  const handlers = useSwipeable({
    onSwipedRight: () => {
      setCurrentDate(new Date(currentYear, currentDate.getMonth() - 1, 1));
    },
    onSwipedLeft: () => {
      setCurrentDate(new Date(currentYear, currentDate.getMonth() + 1, 1));
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // 하루에 표시할 총 태그 수 (이벤트 태그 + more 태그 포함)
  const MAX_DISPLAYED = 2;

  return (
    <Container>
      <CalendarContentWrapper>
        <CalendarHeader>
          <MonthYearText>{`${monthLabels[currentMonth - 1]} ${currentYear}`}</MonthYearText>
          <NavigationContainer>
            <NavButton onClick={() => setCurrentDate(new Date(currentYear, currentDate.getMonth() - 1, 1))}>
              {"<"}
            </NavButton>
            <NavButton onClick={() => setCurrentDate(new Date(currentYear, currentDate.getMonth() + 1, 1))}>
              {">"}
            </NavButton>
          </NavigationContainer>
        </CalendarHeader>

        <WeekdaysRow>
          {weekdayLabels.map((label) => (
            <WeekdayCell key={label} $isSunday={label === "Sun"}>
              {label}
            </WeekdayCell>
          ))}
        </WeekdaysRow>

        <div {...handlers}>
          <CalendarGrid>
            {daysArray.map((day, idx) => {
              const isCurrentMonth = day.getMonth() === currentMonth - 1;
              const isToday = checkIsToday(day);
              const isSelected = selectedDate && selectedDate.getTime() === day.getTime();
              const dailyEvents = getEventsByDate(day);
              let eventsToShow = dailyEvents;
              if (dailyEvents.length > MAX_DISPLAYED) {
                eventsToShow = dailyEvents.slice(0, MAX_DISPLAYED - 1);
              }
              return (
                <DayCell
                  key={idx}
                  $isCurrentMonth={isCurrentMonth}
                  $isToday={isToday}
                  $isSelected={!!isSelected}
                  onClick={() => handleDayClick(day)}
                >
                  {day.getDate()}
                  {dailyEvents.length > 0 && (
                    <EventWrapper>
                      {eventsToShow.map((ev) => (
                        <EventTag key={ev.id} $isOriginal={ev.memo === "메모"}>
                          {ev.title}
                        </EventTag>
                      ))}
                      {dailyEvents.length > MAX_DISPLAYED && (
                        <MoreTag>+{dailyEvents.length - (MAX_DISPLAYED - 1)} more</MoreTag>
                      )}
                    </EventWrapper>
                  )}
                </DayCell>
              );
            })}
          </CalendarGrid>
        </div>

        <FloatingButton onClick={handleAddEvent}>
          <CiCirclePlus size={30} />
        </FloatingButton>
      </CalendarContentWrapper>

      {selectedEvents.length > 0 && selectedDate && (
        <ToggleMenusWrapper>
          {selectedEvents.map((ev) => (
            <ToggleMenu
              key={ev.id}
              leftLabel={ev.isAllday ? "종일" : formatInTimeZone(new Date(ev.startDate), "Asia/Seoul", "HH:mm")}
              rightLabel={ev.title}
              onClickArrow={() => setModalEvent(ev)}
              isOriginal={ev.memo === "메모"}
            />
          ))}
        </ToggleMenusWrapper>
      )}

      <BottomNavbar />

      {modalEvent && <EventModal event={modalEvent} selectedDate={selectedDate} onClose={() => setModalEvent(null)} />}
    </Container>
  );
};

export default Calendar;
