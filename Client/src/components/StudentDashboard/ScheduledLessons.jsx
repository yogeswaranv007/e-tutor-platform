import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import "../../styles/StudentDashboard/ScheduledLessons.css";
import Tutor1 from "../../assets/Tutor1.png";
import Tutor2 from "../../assets/Tutor2.png";
import ThreeDot from '../../assets/ThreeDot.png';

const ScheduledLessons = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookedSessions, setBookedSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?._id) {
      fetchBookedSessions();
    }
  }, [user?._id]);

  const fetchBookedSessions = async () => {
    try {
      const response = await axios.get(`/api/booked-sessions/student/${user._id}`);
      if (response.data.success) {
        setBookedSessions(response.data.sessions);
      }
    } catch (error) {
      console.error('Error fetching booked sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [startTime, endTime] = timeString.split('-');
    const [startHour, startMinute] = startTime.split(':');
    const [endHour, endMinute] = endTime.split(':');
    
    const formatTime = (hour, minute) => {
      const h = parseInt(hour);
      const m = parseInt(minute);
      const formattedHour = h > 12 ? h - 12 : h;
      const amPm = h >= 12 ? 'PM' : 'AM';
      return `${formattedHour}:${m.toString().padStart(2, '0')} ${amPm}`;
    };
    
    return `${formatTime(startHour, startMinute)} - ${formatTime(endHour, endMinute)}`;
  };

  const startSession = (session) => {
    // Navigate to session page with session data
    navigate('/session', { 
      state: { 
        roomName: `${session.subject}-session-${session._id}`,
        session: session,
        user: {
          name: user.name || user.username,
          email: user.email
        } 
      } 
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'booked':
        return '#FE6635';
      case 'completed':
        return '#28a745';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div className="scheduled-lessons">
        <h3>Scheduled Lessons</h3>
        <div className="loading">Loading your sessions...</div>
      </div>
    );
  }

  return (
    <div className="scheduled-lessons">
      <h3>Scheduled Lessons</h3>
      <div className="lessons-container">
        {bookedSessions.length > 0 ? (
          bookedSessions.map((session) => (
            <div key={session._id} className="lesson-box">
              <div className="lesson-header">
                <div className="tutor-avatar">
                  {session.tutorName ? session.tutorName.charAt(0).toUpperCase() : 'T'}
                </div>
                <div className="session-status" style={{ backgroundColor: getStatusColor(session.status) }}>
                  {session.status.toUpperCase()}
                </div>
              </div>
              <div className="lesson-content">
                <p><strong>Tutor:</strong> {session.tutorName}</p>
                <p><strong>Date:</strong> {formatDate(session.date)}</p>
                <p><strong>Time:</strong> {formatTime(session.time)}</p>
                <p><strong>Subject:</strong> {session.subject}</p>
                <p><strong>Duration:</strong> {session.duration}</p>
                <p><strong>Rate:</strong> Rs. {session.rate}</p>
                <p><strong>Payment:</strong> {session.paymentMethod}</p>
                {session.status === 'booked' && (
                  <button 
                    onClick={() => startSession(session)}
                    className="start-session-btn"
                  >
                    Start Session
                  </button>
                )}
                {session.status === 'completed' && (
                  <div className="completed-session">
                    <span>✓ Session Completed</span>
                  </div>
                )}
                {session.status === 'cancelled' && (
                  <div className="cancelled-session">
                    <span>✗ Session Cancelled</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-sessions">
            <p>No scheduled lessons found.</p>
            <p>Book a session with a tutor to see your lessons here!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScheduledLessons;