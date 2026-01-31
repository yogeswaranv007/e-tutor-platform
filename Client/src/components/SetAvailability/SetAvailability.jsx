import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './../../styles/SetAvailability/SetAvailability.css';

const Availability = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [confirmedSessions, setConfirmedSessions] = useState([]);
  const [tutorProfile, setTutorProfile] = useState(null);
  const [sessionDetails, setSessionDetails] = useState({
    tutorName: '',
    lesson: '',
    rate: '',
    duration: '1 hour'
  });
  const timeSlots = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '01:00-02:00', '02:00-03:00', '03:00-04:00'];

  useEffect(() => {
    const fetchTutorProfile = async () => {
      if (!user?._id) return;

      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          params: { 
            userId: user._id,
            userType: 'Tutor'
          }
        });
        
        if (response.data.success) {
          const profile = response.data.profile;
          setTutorProfile(profile);
          setSessionDetails((prev) => ({
            tutorName: profile?.name || prev.tutorName,
            lesson: profile?.TutoringTopics || prev.lesson,
            rate: profile?.hourlyRate || prev.rate,
            duration: prev.duration || '1 hour'
          }));
        }
      } catch (error) {
        console.error('Error fetching tutor profile:', error);
      }
    };

    const fetchTutorSessions = async () => {
      if (!user?._id) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/set-availability/tutor/${user._id}`);
        if (response.data.success) {
          setConfirmedSessions(response.data.sessions);
        }
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    if (user?._id) {
      fetchTutorProfile();
      fetchTutorSessions();
    }
  }, [user?._id]);

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();
    return { days, startDay };
  };

  const isDateDisabled = (day) => {
    const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateToCheck < today;
  };

  const handleDateClick = (day) => {
    if (isDateDisabled(day)) return;
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    setSelectedTime(null);
  };

  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTime(timeSlot);
  };

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time.');
      return;
    }

    const tutorName = sessionDetails.tutorName || tutorProfile?.name || '';
    const lesson = sessionDetails.lesson || tutorProfile?.TutoringTopics || '';
    const rate = sessionDetails.rate || tutorProfile?.hourlyRate || '';
    const duration = sessionDetails.duration || '1 hour';

    if (!tutorName || !lesson || !rate || !duration) {
      alert('Please provide tutor name, lesson, rate, and duration before confirming.');
      return;
    }

    const session = {
      date: selectedDate.getFullYear() + '-' +
            String(selectedDate.getMonth() + 1).padStart(2, '0') + '-' +
            String(selectedDate.getDate()).padStart(2, '0'),
      time: selectedTime,
      tutorId: user._id,
      tutor: tutorName,
      lesson,
      rate: Number(rate),
      duration,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/set-availability', session);
      if (response.data.success) {
        setConfirmedSessions((prev) => [...prev, response.data.session]);
        alert('Session confirmed successfully!');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to confirm session');
    }

    setSelectedDate(null);
    setSelectedTime(null);
  };

  const { days, startDay } = getDaysInMonth();

  return (
    <div className="availability-container">
      <h1 className="title">SCHEDULE YOUR SESSIONS</h1>

      <div className="main-content">
        <div className="calendar-section">
          <div className="calendar-container">
            <div className="calendar-header">
              <button onClick={() => changeMonth(-1)}>&lt;</button>
              <span>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              <button onClick={() => changeMonth(1)}>&gt;</button>
            </div>
            <div className="calendar-grid">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="day-name">{day}</div>
              ))}
              {Array.from({ length: startDay }).map((_, i) => (
                <div key={`empty-${i}`} className="calendar-date empty"></div>
              ))}
              {Array.from({ length: days }, (_, i) => i + 1).map((day) => (
                <div
                  key={day}
                  className={`calendar-date ${
                    selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth() ? 'selected' : ''
                  } ${isDateDisabled(day) ? 'disabled' : ''}`}
                  onClick={() => handleDateClick(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
          <div className="time-slots-section">
            <div className="selected-date">
              {selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' }) : "Select Time Slot"}
            </div>
            <div className="time-slots">
              {timeSlots.map((timeSlot) => (
                <div
                  key={timeSlot}
                  className={`time-slot ${selectedTime === timeSlot ? 'selected' : ''}`}
                  onClick={() => handleTimeSlotClick(timeSlot)}
                >
                  {timeSlot}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="availability-details">
            <h3>Set Availability</h3>
            <p><strong>Tutor:</strong> {tutorProfile?.name || user?.username || 'Tutor'}</p>
            {!tutorProfile?.name && (
              <p className="availability-hint">
                Please update your name in profile settings.
              </p>
            )}
            <p><strong>Lesson:</strong> {tutorProfile?.TutoringTopics || sessionDetails.lesson || ''}</p>
            {!tutorProfile?.TutoringTopics && (
              <div className="availability-input">
                <input
                  type="text"
                  value={sessionDetails.lesson}
                  onChange={(e) => setSessionDetails({ ...sessionDetails, lesson: e.target.value })}
                  placeholder="Enter lesson/subject"
                />
              </div>
            )}
            <p><strong>Rate:</strong> Rs. {tutorProfile?.hourlyRate || sessionDetails.rate || ''}</p>
            {!tutorProfile?.hourlyRate && (
              <div className="availability-input">
                <input
                  type="number"
                  min="0"
                  value={sessionDetails.rate}
                  onChange={(e) => setSessionDetails({ ...sessionDetails, rate: e.target.value })}
                  placeholder="Enter hourly rate"
                />
              </div>
            )}
            <p><strong>Date:</strong> {selectedDate ? selectedDate.toLocaleDateString() : 'Select a date'}</p>
            <p><strong>Time:</strong> {selectedTime || 'Select a time slot'}</p>
            {!sessionDetails.duration && (
              <div className="availability-input">
                <input
                  type="text"
                  value={sessionDetails.duration}
                  onChange={(e) => setSessionDetails({ ...sessionDetails, duration: e.target.value })}
                  placeholder="Enter duration (e.g., 1 hour)"
                />
              </div>
            )}
            <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
          </div>
          <div className="confirmed-sessions">
            <h3>Confirmed Sessions</h3>
            {confirmedSessions.length > 0 ? (
              confirmedSessions.map((session, index) => (
                <div key={index} className="confirmed-session">
                  <p><strong>Date:</strong> {session.date}</p>
                  <p><strong>Time:</strong> {session.time}</p>
                  <p><strong>Lesson:</strong> {session.lesson}</p>
                  <p><strong>Rate:</strong> Rs. {session.rate}</p>
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