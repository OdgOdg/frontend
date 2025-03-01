import React, { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { sampleEvents } from './EventData';
import ToggleMenu from './EventToggle';
import { CiCirclePlus } from 'react-icons/ci';
import { useSwipeable } from 'react-swipeable';
import BottomNavbar from "../../components/BottomNavbar";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-family: 'Helvetica', 'Arial', sans-serif;
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

const WeekdayCell = styled.div<{ isSunday?: boolean }>`
  color: ${({ isSunday }) => (isSunday ? '#EF0707' : 'inherit')};
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: right;
  padding: 0;
  row-gap: 0;
  column-gap: 0;
`;

const DayCell = styled.div<{
  isCurrentMonth?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
}>`
  min-height: 80px;
  padding: 0.5rem;
  box-sizing: border-box;
  position: relative;
  border: 1px solid ${({ isSelected }) => (isSelected ? 'black' : '#DDDDDD')};
  color: ${({ isCurrentMonth }) => (isCurrentMonth ? '#333' : '#bbb')};
  background-color: ${({ isToday }) => (isToday ? '#D9D9D9' : 'transparent')};
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

const EventTag = styled.div<{ isOriginal?: boolean }>`
  background-color: ${({ isOriginal }) => (isOriginal ? '#00AA5B' : '#4771EC')};
  color: #fff;
  font-size: 0.5rem;
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
  position : absolute;
  bottom : 19.5rem;
  right : 1rem;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 100%;
  background-color: #00AA5B;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 999;
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

/* ------------------------- Component & Types ------------------------- */

interface CalendarProps {
  year: number;
  month: number;
}

const Calendar: React.FC<CalendarProps> = ({ year, month }) => {
  const [currentDate, setCurrentDate] = useState(new Date(year, month - 1, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth, 0);
  const startWeekday = firstDayOfMonth.getDay(); // 0=일 ~ 6=토
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

  const getEventsByDate = (date: Date) => {
    const yyyymmdd = format(date, 'yyyy-MM-dd');
    return sampleEvents.filter((ev) => ev.date === yyyymmdd);
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
    alert('새로운 일정 추가 버튼을 눌렀습니다!');
  };

  const handlers = useSwipeable({
    onSwipedRight: () => {
      setCurrentDate(new Date(currentYear, currentDate.getMonth() - 1, 1));
    },
    onSwipedLeft: () => {
      setCurrentDate(new Date(currentYear, currentDate.getMonth() + 1, 1));
    },
    // 오류있긴한데 해결방법을 정확히 모르고 일단 실행에 문제없어서 놔뒀습니다..
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const monthLabels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return (
    <>
      <Container>
        {/* 달력 헤더 */}
        <CalendarHeader>
          <MonthYearText>
            {`${monthLabels[currentMonth - 1]} ${currentYear}`}
          </MonthYearText>
          <NavigationContainer>
            <NavButton
              onClick={() =>
                setCurrentDate(new Date(currentYear, currentDate.getMonth() - 1, 1))
              }
            >
              {"<"}
            </NavButton>
            <NavButton
              onClick={() =>
                setCurrentDate(new Date(currentYear, currentDate.getMonth() + 1, 1))
              }
            >
              {">"}
            </NavButton>
          </NavigationContainer>
        </CalendarHeader>

        {/* 요일 헤더 */}
        <WeekdaysRow>
          {weekdayLabels.map((label) => (
            <WeekdayCell key={label} isSunday={label === 'Sun'}>
              {label}
            </WeekdayCell>
          ))}
        </WeekdaysRow>

        {/* 날짜 셀 */}
        <div {...handlers}>
          <CalendarGrid>
            {daysArray.map((day, idx) => {
              const isCurrentMonth = day.getMonth() === currentMonth - 1;
              const isToday = checkIsToday(day);
              const isSelected = selectedDate && selectedDate.getTime() === day.getTime();
              const dailyEvents = getEventsByDate(day);

              return (
                <DayCell
                  key={idx}
                  isCurrentMonth={isCurrentMonth}
                  isToday={isToday}
                  isSelected={!!isSelected}
                  onClick={() => handleDayClick(day)}
                >
                  {day.getDate()}
                  {/* 날짜 셀 내부 이벤트 태그 표시 */}
                  {dailyEvents.length > 0 && (
                    <EventWrapper>
                      {dailyEvents.map((ev, i) => (
                        <EventTag key={i} isOriginal={ev.isOriginal}>
                          {ev.title}
                        </EventTag>
                      ))}
                    </EventWrapper>
                  )}
                </DayCell>
              );
            })}
          </CalendarGrid>
        </div>

        {/* 선택된 날짜의 이벤트를 ToggleMenu(가로배치)로 렌더링 */}
        {selectedEvents.length > 0 && selectedDate && (
          <ToggleMenusWrapper>
            {selectedEvents.map((ev, i) => (
              <ToggleMenu
                key={i}
                leftLabel={ev.time}
                rightLabel={ev.title}
                onClickArrow={() => alert(`"${ev.title}" 화살표 클릭!`)}
                isOriginal={ev.isOriginal}
              />
            ))}
          </ToggleMenusWrapper>
        )}

        {/* ADDED: 우측 하단 플로팅 버튼 */}
        <FloatingButton onClick={handleAddEvent}>
          <CiCirclePlus size={30} />
        </FloatingButton>
      </Container>
      <BottomNavbar />
    </>
  );
};

export default Calendar;
