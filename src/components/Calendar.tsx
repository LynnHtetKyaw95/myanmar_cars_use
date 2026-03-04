import { useState } from 'react';
import { canDriveOnDate } from '../utils/plateUtils';
import './Calendar.css';

interface CalendarProps {
  plate: string;
}

export const Calendar = ({ plate }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  if (!plate) {
    return null;
  }

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isToday = (day: number) => {
    const now = new Date();
    return day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
  };

  const isAllowed = (day: number) => {
    return canDriveOnDate(plate, day);
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day calendar-day--empty" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const allowed = isAllowed(day);
    const isCurrentDay = isToday(day);
    
    let dayClass = 'calendar-day';
    if (isCurrentDay) {
      dayClass += ' calendar-day--today';
    } else if (allowed) {
      dayClass += ' calendar-day--allowed';
    } else {
      dayClass += ' calendar-day--restricted';
    }

    days.push(
      <div key={day} className={dayClass}>
        <span className="day-number">{day}</span>
        {allowed && !isCurrentDay && <span className="day-dot" />}
      </div>
    );
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth} className="calendar-nav" type="button">
          ‹
        </button>
        <h3 className="calendar-title">{monthName}</h3>
        <button onClick={nextMonth} className="calendar-nav" type="button">
          ›
        </button>
      </div>

      <div className="calendar-weekdays">
        {weekDays.map(day => (
          <div key={day} className="weekday">{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {days}
      </div>

      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-dot legend-dot--allowed"></span>
          <span>Can Drive</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot legend-dot--restricted"></span>
          <span>Cannot Drive</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot legend-dot--today"></span>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
};
