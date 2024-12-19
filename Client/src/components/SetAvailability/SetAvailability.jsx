import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import "../../styles/SetAvailability/SetAvailability.css"

// Sample time slots
const TIME_SLOTS = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'
];

const Availability = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [availabilitySlots, setAvailabilitySlots] = useState({});
  const [confirmedSessions, setConfirmedSessions] = useState([]);

  // Toggle date selection
  const handleDateSelect = (date) => {
    setSelectedDates(prev =>
      prev.includes(date)
        ? prev.filter(d => d !== date)
        : [...prev, date]
    );
  };

  // Toggle time slot for a specific date
  const toggleTimeSlot = (date, slot) => {
    setAvailabilitySlots(prev => {
      const currentDateSlots = prev[date] || [];
      const newSlots = currentDateSlots.includes(slot)
        ? currentDateSlots.filter(s => s !== slot)
        : [...currentDateSlots, slot];

      return {
        ...prev,
        [date]: newSlots
      };
    });
  };

  // Confirm availability for selected dates
  const handleConfirm = () => {
    selectedDates.forEach(date => {
      (availabilitySlots[date] || []).forEach(slot => {
        const session = {
          date: new Date(date),
          time: slot
        };
        setConfirmedSessions(prev => [...prev, session]);
      });
    });
    setSelectedDates([]);
    setAvailabilitySlots({});
  };

  return (
    <div className="availability-container">
      <h1 className="title">SCHEDULE YOUR SESSIONS</h1>

      <div className="main-content">
        <div className="calendar-section">
          <div className="calendar-container">
            <div className="calendar-header">
              <Calendar className="mr-2" />
              <span>Select Dates</span>
            </div>
            <div className="calendar-grid">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="day-name">{day}</div>
              ))}
              {selectedDates.map(date => (
                <div
                  key={date}
                  className={`calendar-date ${new Date().toDateString() === new Date(date).toDateString() ? 'today' : ''}`}
                  onClick={() => handleDateSelect(date)}
                >
                  {new Date(date).getDate()}
                </div>
              ))}
            </div>
          </div>
          <div className="time-slots-section">
            <div className="selected-date">
              {selectedDates.length > 0 ? `Selected Dates: ${selectedDates.join(', ')}` : 'Select Dates'}
            </div>
            <div className="time-slots">
              {selectedDates.map(date => (
                <div key={date} className="date-slots">
                  <h4>{new Date(date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</h4>
                  <div className="slots">
                    {TIME_SLOTS.map(slot => (
                      <div
                        key={slot}
                        className={`time-slot ${(availabilitySlots[date] || []).includes(slot) ? 'selected' : ''}`}
                        onClick={() => toggleTimeSlot(date, slot)}
                      >
                        {slot}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="set-availability">
          <div className="availability-details">
            <h3>Set Availability</h3>
            <p><strong>Tutor:</strong> Ana de Armas</p>
            <p><strong>Lesson:</strong> Geometry</p>
            <p><strong>Rate:</strong> Rs. 100</p>
            <p><strong>Duration:</strong> 1 hour</p>
            <button className="confirm-button" onClick={handleConfirm}>
              Confirm Availability
            </button>
          </div>
          <div className="confirmed-sessions">
            <h3>Confirmed Sessions</h3>
            {confirmedSessions.length > 0 ? (
              confirmedSessions.map((session, index) => (
                <div key={index} className="confirmed-session">
                  <p>{session.date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                  <p>{session.time}</p>
                </div>
              ))
            ) : (
              <p>No Sessions Confirmed yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Availability;