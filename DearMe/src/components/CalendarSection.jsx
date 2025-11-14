import { useState, useMemo } from "react";
import Calendar from "react-calendar";
import MemoBox from "./MemoBox";
import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarSection.css';

const TESTDATA = {
  status: 200,
  message: '조회 성공',
  data: {
    xClientId: 'abc123',
    memos: [
      { memoId: 123, date: '2025-11-8', emoji: "😊", title: '좋은 하루 가나다라' },
      { memoId: 124, date: '2025-11-10', emoji: "😢", title: '힘든 하루' },
      { memoId: 125, date: '2025-11-10', emoji: "😡", title: '짜증나는 하루' },
      { memoId: 126, date: '2025-11-11', emoji: "🤔", title: '고민' },
      { memoId: 127, date: '2025-11-12', emoji: "🎉", title: '파티' },
      { memoId: 128, date: '2025-11-13', emoji: "💻", title: '코딩' },
      { memoId: 129, date: '2025-11-14', emoji: "😴", title: '피곤함' },
    ]
  }
}

function CalendarSection() {

  const [date, setDate] = useState(new Date());
  const [curMonth, setCurMonth] = useState(date.getMonth() + 1);
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleCurMonth = ({ activeStartDate }) => {
    setCurMonth(activeStartDate.getMonth() + 1);
  }

  const memoMap = useMemo(() => {
    const map = new Map();
    TESTDATA.data.memos.forEach(memo => {
      const dateKey = memo.date;
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey).push(memo);
    });
    return map;
  }, []);

  return (
    <>
      <Calendar
        onChange={setDate}
        value={date}
        calendarType="gregory"
        prev2Label={null}
        next2Label={null}
        formatDay={(locale, date) => date.getDate()}
        onActiveStartDateChange={handleCurMonth}
        tileContent={({ date, view }) => {
          // 4. react-calendar의 date 객체를 TESTDATA 형식(YYYY-M-D)의 문자열로 변환
          const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

          // 5. Map에서 해당 날짜의 메모 조회
          const dailyMemos = memoMap.get(dateKey) || [];

          // 6. 현재 월인지 확인
          const isCurrentMonth = curMonth === date.getMonth() + 1;

          // 7. 현재 월인 경우에만 메모와 + 버튼 렌더링
          return (view === 'month' && isCurrentMonth) ? (
            // 8. Fragment(<>)로 묶어서 두 요소를 모두 반환
            <>
              {/* 메모 목록 (최대 2개, 세로 정렬) */}
              <div className="calendar-memo-list">
                {dailyMemos.slice(0, 2).map((memo) => (
                  <div key={memo.memoId} className="calendar-memo-item">
                    <span className="calendar-memo-emoji">{memo.emoji}</span>
                    <span className="calendar-memo-title">{memo.title}</span>
                  </div>
                ))}
              </div>

              {/* 기존 + 버튼 */}
              <span onClick={(e) => {
                e.stopPropagation();
                setIsMemoOpen(true);
                setSelectedDate(date);
              }} className="calendar-plus">+</span>
            </>
          ) : null;
        }}
      />
      {isMemoOpen && <MemoBox selectedDate={selectedDate} onClose={() => setIsMemoOpen(false)} />}
    </>
  );
}

export default CalendarSection;
