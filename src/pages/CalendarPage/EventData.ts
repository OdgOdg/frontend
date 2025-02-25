export interface CalendarEvent {
    date: string;
    title: string;
    time: string;
    /** true: 원래 데이터, false: 사용자가 추가한 데이터 */
    isOriginal: boolean;
  }

  export const sampleEvents: CalendarEvent[] = [
    { date: '2025-02-04', title: '인천대 축제', time: '종일', isOriginal: true },
    { date: '2025-02-05', title: '인천대 축제', time: '종일', isOriginal: true },
    { date: '2025-02-06', title: '인천대 축제', time: '종일', isOriginal: true },
    { date: '2025-02-18', title: '송도 맥주 축제', time: '종일', isOriginal: true },
    { date: '2025-02-19', title: '송도 맥주 축제', time: '종일', isOriginal: true },
    { date: '2025-02-19', title: '5시 인하대', time: '5:00 PM', isOriginal: false },
    { date: '2025-02-25', title: '6시 부평역', time: '6:00 PM', isOriginal: false },
    { date: '2025-01-28', title: '7시 월미도', time: '7:00 PM', isOriginal: false },
    { date: '2025-01-29', title: '1시 주안역', time: '1:00 PM', isOriginal: false },
    { date: '2025-01-21', title: '4시 송달축', time: '4:00 PM', isOriginal: false },
    { date: '2025-01-22', title: '3시 소래포구', time: '3:00 PM', isOriginal: false },
  ];
  