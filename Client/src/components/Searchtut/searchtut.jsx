import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './../../Styles/Searchtut/searchtut.css';
import dpimg from '../../Assets/dpimg.png';
import jesse from '../../Assets/jesse.png';
import axios from 'axios';

function SearchTut() {
  const navigate = useNavigate();
  const { tutorId } = useParams();
  const [profile, setProfile] = useState({
    name: '',
    education: '',
    experience: '',
    expertiseIn: '',
    TutoringTopics: '',
    TutoringLanguage: [],
    hourlyRate: '',
    bio: '',
    linkedin: '',
    profession: '',
    skills: [],
    location: '',
    gender: ''
  });
  const [profileImage, setProfileImage] = useState(dpimg);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableSessions, setAvailableSessions] = useState([]);

  useEffect(() => {
    if (!tutorId) {
      setError('No tutor ID provided');
      setLoading(false);
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await axios.get('/api/profile', {
          params: { userId: tutorId, userType: 'Tutor' }
        });

        if (response.data.success) {
          setProfile(response.data.profile);
          await fetchProfileImage();
          await fetchAvailableSessions();
        } else {
          setError('Failed to load tutor profile');
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
        setError('Failed to load tutor profile');
        setLoading(false);
      }
    };

    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(`/api/profile/image/${tutorId}`, {
          params: { userType: 'Tutor' },
          responseType: 'arraybuffer'
        });

        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const imageUrl = URL.createObjectURL(blob);
        setProfileImage(imageUrl);
      } catch (error) {
        console.error('Failed to fetch profile image:', error);
      }
    };

    const fetchAvailableSessions = async () => {
      try {
        const response = await axios.get(`/api/set-availability/tutor/${tutorId}`);
        if (response.data.success) {
          const sessions = response.data.sessions;
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);
          const futureSessions = sessions.filter(session => 
            new Date(session.date) >= currentDate
          );
          const sortedSessions = futureSessions.sort((a, b) => {
            const dateCompare = new Date(a.date) - new Date(b.date);
            if (dateCompare === 0) {
              return a.time.localeCompare(b.time);
            }
            return dateCompare;
          });
          setAvailableSessions(sortedSessions);
        }
      } catch (error) {
        console.error('Failed to fetch available sessions:', error);
      }
    };

    fetchProfileData();
    return () => {
      if (profileImage !== dpimg) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [tutorId, profileImage]);

  const handleMessageClick = () => {
    navigate('/chats', { state: { tutorId } });
  };

  const handleBookSessionClick = () => {
    navigate('/book-session', { state: { tutorId } });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(':');
    const formattedHour = hour > 12 ? hour - 12 : hour;
    const amPm = hour >= 12 ? 'PM' : 'AM';
    return `${formattedHour}:${minute} ${amPm}`;
  };

  if (loading) {
    return (
      <div className="searchtut-container">
        <div className="loading">Loading tutor details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="searchtut-container">
        <div className="error">
          <p>{error}</p>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="searchtut-container">
      <div className="left-column">
        <div className="tutor-profile">
          <img
            src={profileImage}
            alt="Tutor Profile"
            className="profile-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = dpimg;
            }}
          />
          <h2 className="tutor-name">{profile.name || 'Unnamed Tutor'}</h2>
          <p className="rating">⭐ 5.0 (123)</p>
          <p className="tutor-hours">1608 hours of Tutoring</p>
          <p className="tutor-description">
            {profile.expertiseIn || 'Expertise information not available'}
          </p>
          <p className="hourly-rate">
            Hourly rate: Rs.{profile.hourlyRate || 'Not specified'}
          </p>
          <button className="book-session-btn" onClick={handleBookSessionClick}>
            Book Session
          </button>
        </div>

        <div className="available-sessions">
          <h3>Available Sessions</h3>
          {availableSessions.length > 0 ? (
            availableSessions.map((session, index) => (
              <button key={index} className="session-time">
                {formatDate(session.date)} - {formatTime(session.time)}
              </button>
            ))
          ) : (
            <p>No sessions available</p>
          )}
        </div>
      </div>

      <div className="right-column">
        <div className="tutor-info">
          <section className="info-section">
            <h3>Qualification</h3>
            <p>{profile.education || 'Education details not available'}</p>
          </section>
          
          <section className="info-section">
            <h3>Experience</h3>
            <p>{profile.experience || 'Experience details not available'}</p>
          </section>
          
          <section className="info-section">
            <h3>Tutoring Topics</h3>
            <p>{profile.TutoringTopics || 'Topics not specified'}</p>
          </section>

          <section className="info-section">
            <h3>Tutoring Languages</h3>
            <p>{profile.TutoringLanguage?.length > 0 
              ? profile.TutoringLanguage.join(', ') 
              : 'Languages not specified'}</p>
          </section>

          {profile.skills?.length > 0 && (
            <section className="info-section">
              <h3>Skills</h3>
              <p>{profile.skills.join(', ')}</p>
            </section>
          )}

          <section className="info-section">
            <h3>Professional Details</h3>
            <p>Profession: {profile.profession || 'Not specified'}</p>
            {profile.linkedin && (
              <p>
                LinkedIn:{' '}
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  Profile
                </a>
              </p>
            )}
          </section>

          <section className="info-section bio">
            <h3>Bio</h3>
            <p>
              {profile.bio || 'Bio not available'}
              {profile.bio && <span className="read-more">Read More</span>}
            </p>
          </section>

          <section className="info-section">
            <h3>Reviews</h3>
            <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
              <div className="review-card">
                <img src={dpimg} alt="Student" className="review-profile-img" />
                <p className="review-text">
                  Mohit helped me channel my preparation and put focused efforts in the
                  right direction. He is really good with cutting the noise off and
                  build focus on the one goal that matters.
                </p>
                <p className="review-author">Sydney Sweeney</p>
                <p className="review-role">ML engineer, NVIDIA</p>
              </div>
              
              <div className="review-card">
                <img src={jesse} alt="Student" className="review-profile-img" />
                <p className="review-text">
                  The way he understands the students and sets plans accordingly, that
                  helps me a lot. He helps me in this journey to IIT Bombay.
                </p>
                <p className="review-author">Sajith</p>
                <p className="review-role">Engineer, Microsoft</p>
              </div>
            </div>
          </section>

          <section className="info-section" style={{textAlign: 'center', border: 'none'}}>
            <p style={{marginBottom: '10px'}}>Any Questions?</p>
            <button className="message-btn" onClick={handleMessageClick}>
              Message
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default SearchTut;