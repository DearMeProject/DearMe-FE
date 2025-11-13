import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import MemoBox from "./MemoBox";
import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarSection.css';

function CalendarSection() {
  const [date, setDate] = useState(new Date());
  const [curMonth, setCurMonth] = useState(date.getMonth() + 1);
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleCurMonth = ({ activeStartDate }) => {
    setCurMonth(activeStartDate.getMonth() + 1);
  }

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
        tileContent={({ date, view }) =>
          (view === 'month' && curMonth === date.getMonth() + 1) ?
            <span onClick={(e) => {
              e.stopPropagation();
              setIsMemoOpen(true);
              setSelectedDate(date);
            }} className="calendar-plus">+</span> : null
        }
      />
      {isMemoOpen && <MemoBox selectedDate = {selectedDate} onClose={() => setIsMemoOpen(false)} />}
    </>
  );
}

export default CalendarSection;
