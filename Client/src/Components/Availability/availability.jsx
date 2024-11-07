import React, { useState } from 'react';
import './Availability.css';

const Availability = () => {
  const [selectedDate, setSelectedDate] = useState('24 October 2024');
  const [selectedTime, setSelectedTime] = useState(null);
  const [confirmedSessions, setConfirmedSessions] = useState([
    { date: '25 October 2024', time: '14:00 - 15:00' },
  ]);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const confirmSession = () => {
    if (selectedTime) {
      setConfirmedSessions([...confirmedSessions, { date: selectedDate, time: selectedTime }]);
      setSelectedTime(null); // Reset selected time
    }
  };

  return (
    <div className="availability-container">
      <header className="header">
        <h2>SCHEDULE YOUR SESSIONS</h2>
      </header>
      
      <div className="availability-content">
        <div className="calendar-section">
          <h3>Calendar</h3>
          <div className="calendar">
            {/* Render calendar days here */}
            {/* You can enhance this further with a fully functional calendar library */}
            <span>October 2024</span>
            <div className="days">
              {/* Hardcoded for simplicity */}
              <div>24</div>
              <div className="selected">25</div>
              <div>26</div>
            </div>
          </div>
          <div className="time-slots">
            {['09:00-10:00', '10:00-11:00', '11:00-12:00', '13:00-14:00'].map((time) => (
              <button
                key={time}
                className={`time-slot ${time === selectedTime ? 'selected' : ''}`}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="availability-details">
          <h3>Set Availability</h3>
          <p>Tutor: Ana de Armas</p>
          <p>Lesson: Geometry</p>
          <p>Rate: Rs.100</p>
          <p>Date: {selectedDate}</p>
          <p>Time: {selectedTime || 'Select a time'}</p>
          <p>Duration: 1 hour</p>
          <button className="confirm-button" onClick={confirmSession}>Confirm</button>
        </div>

        <div className="confirmed-sessions">
          <h3>Confirmed Sessions</h3>
          {confirmedSessions.map((session, index) => (
            <div key={index} className="confirmed-session">
              <p>{session.date}</p>
              <p>{session.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Availability;
