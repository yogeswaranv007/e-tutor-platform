import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './../../Styles/Sessionbook/sessionbook.css';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const times = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '01:00-02:00', '02:00-03:00', '01:00-02:00'];

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const formatSelectedDate = () => {
    if (!selectedDate) return '';
    return `${selectedDate.getDate()} ${selectedDate.toLocaleString('default', { month: 'long' })} ${selectedDate.getFullYear()}`;
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleBookClick = () => {
    navigate('/student-dashboard'); // Redirect to /student-dashboard
  };

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);

  return (
    <div className="calendar-container">
      <h1 className="calendar-title">BOOK YOUR SESSION</h1>

      <div className="booking-section">
        <div className="calendar">
          <div className="calendar-header">
            <button onClick={handlePrevMonth} className="month-nav">{'<'}</button>
            <span>{currentDate.toLocaleString('default', { month: 'long' })} {year}</span>
            <button onClick={handleNextMonth} className="month-nav">{'>'}</button>
          </div>

          <div className="calendar-grid">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            {Array.from({ length: firstDay }).map((_, index) => (
              <div key={`empty-${index}`}></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, day) => (
              <button
                key={day + 1}
                onClick={() => handleDateClick(day + 1)}
                className={`date-button ${selectedDate?.getDate() === day + 1 && selectedDate?.getMonth() === month ? 'selected-date' : ''}`}
              >
                {String(day + 1).padStart(2, '0')}
              </button>
            ))}
          </div>

          <div className="times-section">
            <h2>{selectedDate ? selectedDate.toDateString() : 'Select a date'}</h2>
            {times.map((time) => (
              <button
                key={time}
                className={`time-slot ${time === selectedTime ? 'selected-time' : ''}`}
                onClick={() => handleTimeClick(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="session-details">
          <h2>Book Your Session</h2>
          <p><strong>Tutor:</strong> Ana de Armas</p>
          <p><strong>Lesson:</strong> Algebra 1</p>
          <p><strong>Rate:</strong> Rs.100</p>
          <p><strong>Date:</strong> {selectedDate ? formatSelectedDate() : 'Select a date'}</p>
          <p><strong>Time:</strong> {selectedTime || 'Select a time'}</p>
          <p><strong>Duration:</strong> 1 hour</p>
          <button
            className="book-button"
            disabled={!selectedDate || !selectedTime}
            onClick={handleBookClick}
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calendar;