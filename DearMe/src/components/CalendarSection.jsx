import { useState, useMemo } from "react";
import Calendar from "react-calendar";
import MemoBox from "./MemoBox.jsx";
import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarSection.css';

const STRINGTOEMOJI = {
  'HAPPY': "😀",
  'NEUTRAL': '😐',
  'SLEEPY': '😴',
  'SAD': '😢',
  'ANGRY': '😡'
}

function CalendarSection({ memos, refreshMemos }) {
  const [date, setDate] = useState(new Date());
  const [curMonth, setCurMonth] = useState(date.getMonth() + 1);
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleCurMonth = ({ activeStartDate }) => {
    setCurMonth(activeStartDate.getMonth() + 1);
  }

  const memoMap = useMemo(() => {
    const map = new Map();
    memos.forEach(memo => {
      const dateKey = memo.date;
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey).push(memo);
    });
    return map;
  }, [memos]);

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
          const year = String(date.getFullYear());
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const dateKey = `${year}-${month}-${day}`;
          const dailyMemos = memoMap.get(dateKey) || [];
          const isCurrentMonth = curMonth === date.getMonth() + 1;
          return (view === 'month' && isCurrentMonth) ? (
            <>
              <div className="calendar-memo-list">
                {dailyMemos.slice(0, 2).map((memo) => (
                  <div key={memo.memoId} className="calendar-memo-item">
                    <span className="calendar-memo-emoji">{STRINGTOEMOJI[memo.emoji]}</span>
                    <span className="calendar-memo-title">{memo.title}</span>
                  </div>
                ))}
              </div>

              <span onClick={(e) => {
                e.stopPropagation();
                setIsMemoOpen(true);
                setSelectedDate(dateKey);
              }} className="calendar-plus">+</span>
            </>
          ) : null;
        }}
      />
      {isMemoOpen && <MemoBox refreshMemos={refreshMemos} memosByDate={memoMap.get(selectedDate) || []} selectedDate={selectedDate} onClose={() => setIsMemoOpen(false)} />}
    </>
  );
}

export default CalendarSection;
