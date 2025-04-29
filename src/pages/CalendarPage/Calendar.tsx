import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { formatInTimeZone } from "date-fns-tz";
import ToggleMenu from "./EventToggle";
import { CiCirclePlus } from "react-icons/ci";
import { useSwipeable } from "react-swipeable";
import BottomNavbar from "../../components/BottomNavbar";
import { useNavigate } from "react-router-dom";
import EventModal from "./EventModal";
import axios from "axios";

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

interface Festival {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  category: number;
  addr1: string;
}

interface CalendarProps {
  year: number;
  month: number;
}

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

const WeekdayCell = styled.div<{ $isSunday?: boolean }>`
  color: ${({ $isSunday }) => ($isSunday ? "#EF0707" : "inherit")};
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: right;
`;

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

const EventSummary = styled.div`
  position: absolute;
  bottom: 0.5rem;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const DotWrapper = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const Dot = styled.span<{ color: string }>`
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
`;

const CountText = styled.span`
  font-size: 0.7rem;
  color: #333;
  white-space: nowrap;
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
  &:hover { opacity: 0.9; }
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

const Calendar: React.FC<CalendarProps> = ({ year, month }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date(year, month - 1, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalEvent, setModalEvent] = useState<CalendarEvent | null>(null);

  useEffect(() => {
    axios.get("/api/v1/events")
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
    axios.get("/api/v1/sights/pagination", { params: { limit: 200, category: 2 } })
      .then(res => setFestivals(res.data.data))
      .catch(err => console.error(err));
  }, []);

  const getItemsByDate = (date: Date) => {
    const kst = formatInTimeZone(date, "Asia/Seoul", "yyyy-MM-dd");
    const evs = events.filter(ev => {
      const s = formatInTimeZone(new Date(ev.startDate), "Asia/Seoul", "yyyy-MM-dd");
      const e = formatInTimeZone(new Date(ev.endDate),   "Asia/Seoul", "yyyy-MM-dd");
      return kst >= s && kst <= e;
    });
    const fests = festivals.filter(f => {
      const s = f.startDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
      const e = f.endDate  .replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
      return kst >= s && kst <= e;
    }).map(f => ({
      id: f.id,
      title: f.title,
      startDate: f.startDate,
      endDate: f.endDate,
      memo: "",
      isOrigin: false,
      isAllday: true,
      isFestival: true,
      addr1: f.addr1,
    } as CalendarEvent));
    return [...evs, ...fests];
  };

  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay  = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startWeekday = firstDay.getDay();
  const totalDays     = lastDay.getDate();
  const days: Date[]  = [];
  for (let i = 0; i < startWeekday; i++) days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1 - (startWeekday - i)));
  for (let i = 1; i <= totalDays; i++) days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  const leftover = 7 - (days.length % 7);
  if (leftover < 7) for (let i = 1; i <= leftover; i++) days.push(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i));

  const today = new Date();
  const checkIsToday = (d: Date) =>
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate();

  const handlers = useSwipeable({
    onSwipedRight: () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)),
    onSwipedLeft:  () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <Container>
      <CalendarContentWrapper>
        <CalendarHeader>
          <MonthYearText>{`${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][currentDate.getMonth()]} ${currentDate.getFullYear()}`}</MonthYearText>
          <NavigationContainer>
            <NavButton onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>&lt;</NavButton>
            <NavButton onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>&gt;</NavButton>
          </NavigationContainer>
        </CalendarHeader>
        <WeekdaysRow>{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(label => <WeekdayCell key={label} $isSunday={label === "Sun"}>{label}</WeekdayCell>)}</WeekdaysRow>
        <div {...handlers}>
          <CalendarGrid>
            {days.map((day, idx) => {
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
              const isToday        = checkIsToday(day);
              const isSelected     = selectedDate?.getTime() === day.getTime();
              const items          = getItemsByDate(day);
              const hasEvents      = items.some(ev => !ev.isFestival);
              const hasFestivals   = items.some(ev => ev.isFestival);

              return (
                <DayCell
                  key={idx}
                  $isCurrentMonth={isCurrentMonth}
                  $isToday={isToday}
                  $isSelected={!!isSelected}
                  onClick={() => setSelectedDate(isSelected ? null : day)}
                >
                  {day.getDate()}
                  {items.length > 0 && (
                    <EventSummary>
                      <DotWrapper>
                        {hasEvents    && <Dot color="#4771EC" />}
                        {hasFestivals && <Dot color="#00AA5B" />}
                      </DotWrapper>
                      <CountText>{items.length}개 일정</CountText>
                    </EventSummary>
                  )}
                </DayCell>
              );
            })}
          </CalendarGrid>
        </div>
        <FloatingButton onClick={() => navigate("/addschedule")}> <CiCirclePlus size={30}/> </FloatingButton>
      </CalendarContentWrapper>

      {selectedDate && (
        <ToggleMenusWrapper>
          {getItemsByDate(selectedDate).map(ev => (
            <div key={ev.id} style={{ display: 'inline-block' }} onClick={() => setModalEvent(ev)}>
              <ToggleMenu
                leftLabel={
                  ev.isAllday
                    ? (ev.isFestival ? "축제" : "종일")
                    : formatInTimeZone(new Date(ev.startDate), "Asia/Seoul", "HH:mm")
                }
                rightLabel={ev.title}
                onClickArrow={() => setModalEvent(ev)}
                isOriginal={ev.isFestival}
              />
            </div>
          ))}
        </ToggleMenusWrapper>
      )}
      <BottomNavbar />
      {modalEvent && (
        <EventModal event={modalEvent} selectedDate={selectedDate} onClose={() => setModalEvent(null)} />
      )}
    </Container>
  );
};

export default Calendar;
