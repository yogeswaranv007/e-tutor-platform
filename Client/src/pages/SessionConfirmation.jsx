import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/SessionConfirmation.css';

const SessionConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [session, setSession] = useState(null);
  const [tutorProfile, setTutorProfile] = useState(null);
  const [tutorProfileImage, setTutorProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    if (location.state?.session) {
      setSession(location.state.session);
      fetchTutorProfile(location.state.session.tutorId);
    } else {
      navigate('/find-tutors');
    }
    
    return () => {
      if (tutorProfileImage) {
        URL.revokeObjectURL(tutorProfileImage);
      }
    };
  }, [location.state, navigate, tutorProfileImage]);

  const fetchTutorProfile = async (tutorId) => {
    try {
      const response = await axios.get('/api/profile', {
        params: { userId: tutorId, userType: 'Tutor' }
      });
      
      if (response.data.success) {
        setTutorProfile(response.data.profile);
        await fetchTutorProfileImage(tutorId);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tutor profile:', error);
      setLoading(false);
    }
  };

  const fetchTutorProfileImage = async (tutorId) => {
    try {
      const response = await axios.get(`/api/profile/image/${tutorId}`, {
        params: { userType: 'Tutor' },
        responseType: 'arraybuffer'
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const imageUrl = URL.createObjectURL(blob);
      setTutorProfileImage(imageUrl);
    } catch (error) {
      console.error('Failed to fetch profile image:', error);
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

  const handleBookSession = async () => {
    if (!user) {
      alert('Please login to book a session');
      navigate('/login');
      return;
    }

    // Redirect to payment page with session data
    navigate('/session-payment', { 
      state: { 
        session: session,
        tutorId: session.tutorId 
      } 
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="session-confirmation-container">
        <div className="loading">Loading session details...</div>
      </div>
    );
  }

  if (!session || !tutorProfile) {
    return (
      <div className="session-confirmation-container">
        <div className="error">
          <p>Session not found</p>
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="session-confirmation-container">
      <div className="confirmation-header">
        <h1>BOOK YOUR SESSION</h1>
      </div>

      <div className="confirmation-content">
        <div className="session-details-panel">
          <div className="panel-header">
            <h2>Session Details</h2>
          </div>
          
          <div className="session-info">
            <div className="info-row">
              <span className="label">Tutor:</span>
              <span className="value">{tutorProfile.name || 'Tutor Name'}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Lesson:</span>
              <span className="value">{session.lesson || 'General Tutoring'}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Rate:</span>
              <span className="value">Rs. {session.rate || 'Not specified'}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Date:</span>
              <span className="value">{formatDate(session.date)}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Time:</span>
              <span className="value">{formatTime(session.time)}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Duration:</span>
              <span className="value">{session.duration || '1 hour'}</span>
            </div>
          </div>

          <div className="action-section">
            <button 
              className="book-session-btn" 
              onClick={handleBookSession}
              disabled={booking}
            >
              {booking ? 'Booking...' : 'Book Session'}
            </button>
            
            <button className="go-back-btn" onClick={handleGoBack}>
              Go Back
            </button>
          </div>
        </div>

        <div className="tutor-profile-panel">
          <div className="panel-header">
            <h2>Tutor Profile</h2>
          </div>
          
          <div className="tutor-info">
            <div className="tutor-avatar">
              {tutorProfileImage ? (
                <img 
                  src={tutorProfileImage} 
                  alt="Tutor Profile" 
                  className="tutor-profile-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className="avatar-placeholder" 
                style={{ display: tutorProfileImage ? 'none' : 'flex' }}
              >
                {tutorProfile.name ? tutorProfile.name.charAt(0).toUpperCase() : 'T'}
              </div>
            </div>
            
            <div className="tutor-details">
              <h3>{tutorProfile.name || 'Tutor Name'}</h3>
              <p className="tutor-specialization">
                {tutorProfile.expertiseIn || 'General Tutoring'}
              </p>
              <p className="tutor-education">
                {tutorProfile.education || 'Education details not available'}
              </p>
              <p className="tutor-experience">
                {tutorProfile.experience || 'Experience details not available'}
              </p>
            </div>
          </div>

          {tutorProfile.bio && (
            <div className="tutor-bio">
              <h4>About</h4>
              <p>{tutorProfile.bio}</p>
            </div>
          )}

          {tutorProfile.skills && tutorProfile.skills.length > 0 && (
            <div className="tutor-skills">
              <h4>Skills</h4>
              <div className="skills-tags">
                {tutorProfile.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionConfirmation;
