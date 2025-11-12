import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarSection.css';

function CalendarSection() {
  const [date, setDate] = useState(new Date());
  const [curMonth, setCurMonth] = useState(date.getMonth() + 1);

  const handleCurMonth = ({activeStartDate}) => {
    setCurMonth(activeStartDate.getMonth() + 1);
  }

  return (
    <Calendar
      onChange={setDate}
      value={date}
      calendarType="gregory"
      prev2Label={null}
      next2Label={null}
      formatDay={(locale, date) => date.getDate()}
      onActiveStartDateChange={handleCurMonth}
      tileContent={({ date, view }) =>
        (view === 'month' && curMonth === date.getMonth() + 1) ? <span className="calendar-plus">+</span> : null
      }
    />
  );
}

export default CalendarSection;
