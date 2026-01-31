import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './../../context/AuthContext';
import "../../styles/TutorDashboard/ProfileInfo.css";
import Tutor1 from "../../assets/Tutor1.png";
import { useNavigate } from 'react-router-dom';

const ProfileInfo = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [confirmedSessions, setConfirmedSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch Dashboard Data and Profile Image
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?._id) {
        setError({ message: 'User is not logged in or tutor ID is missing.' });
        setLoading(false);
        return;
      }

      try {
        const dashboardResponse = await axios.get('http://localhost:5000/api/tutor/dashboard', {
          params: { tutorId: user._id },
        });

        let imageUrl = null;
        try {
          const profileImageResponse = await axios.get(`http://localhost:5000/api/profile/image/${user._id}`, {
            params: { userType: 'Tutor' },
            responseType: 'arraybuffer',
          });

          imageUrl = URL.createObjectURL(
            new Blob([profileImageResponse.data], {
              type: profileImageResponse.headers['content-type'],
            })
          );
        } catch (imgError) {
          console.log('Profile image not found, using default image');
        }

        setDashboardData({
          ...dashboardResponse.data.dashboardData,
          imageUrl,
        });
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        if (err?.response?.status === 404) {
          setDashboardData({
            email: user?.email || '',
            name: user?.username || 'Tutor',
            location: '',
            skills: [],
            experience: ''
          });
          return;
        }
        setError(err);
      }
    };

    fetchDashboardData();
  }, [user?._id]);

  // Fetch Confirmed Sessions
  useEffect(() => {
    const fetchConfirmedSessions = async () => {
      if (!user?._id) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/api/set-availability/tutor/${user._id}`
        );
        if (response.data.success) {
          setConfirmedSessions(response.data.sessions || []);
        }
      } catch (error) {
        console.error('Error fetching confirmed sessions:', error);
        // Don't set error state for sessions - just keep it empty
        setConfirmedSessions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConfirmedSessions();
  }, [user?._id]);

  const handleClick = () => {
    navigate('/set-availability');
  };

  // Loading and Error States
  if (loading) {
    return <div className="profile-info-container">Loading...</div>;
  }

  // Only show error if it's a critical error (dashboard data fetch failed)
  if (error && !dashboardData) {
    return (
      <div className="profile-info-container">
        <div className="error-message">
          <h3>Unable to load dashboard</h3>
          <p>{error.message || 'Something went wrong!'}</p>
          <p>Please try refreshing the page or contact support if the issue persists.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-info-container">
      <h2>Tutor Dashboard</h2>
      {dashboardData?.imageUrl ? (
        <img
          src={dashboardData.imageUrl}
          alt={`${dashboardData.name}'s profile`}
          className="profile-info-image"
          style={{ width: '100px', height: '100px', borderRadius: '50%' }}
        />
      ) : (
        <img
          src={Tutor1}
          alt="Default Tutor"
          className="profile-info-image"
        />
      )}
      <div className="profile-info-name">{dashboardData?.name || 'Unknown Name'}</div>
      <div className="profile-info-email">{dashboardData?.email || user?.email}</div>
      <div className="profile-info-location">{dashboardData?.location || 'Unknown Location'}</div>

      <div className="set-availability-btn-container">
        <button className="set-availability-btn" onClick={handleClick}>
          Set Availability
        </button>
      </div>

      <div className="profile-info-separator"></div>

      <div className="profile-info-specialization">
        <div className="profile-info-specialization-head">Specialization:</div>
        {dashboardData?.skills && dashboardData?.skills.length > 0 ? (
          dashboardData.skills.map((skill, index) => (
            <div key={index} className="profile-info-specialization-badge">
              {skill}
            </div>
          ))
        ) : (
          <div className="profile-info-specialization-badge">No skills added</div>
        )}
      </div>

      <p className="profile-info-experience-head">Experience:</p>
      <div className="profile-info-box">
        <p>{dashboardData?.experience || 'No experience details available.'}</p>
      </div>

      <p className="profile-info-confirmed-sessions-head">Confirmed Sessions:</p>
      {confirmedSessions && confirmedSessions.length > 0 ? (
        confirmedSessions.map((session, index) => (
          <div key={session._id || index} className="profile-info-box">
            <p>
              <strong>Date:</strong>{' '}
              {new Date(session.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <p>
              <strong>Time:</strong> {session.time}
            </p>
            <p>
              <strong>Lesson:</strong> {session.lesson}
            </p>
            <p>
              <strong>Rate:</strong> ${session.rate}
            </p>
            <p>
              <strong>Duration:</strong> {session.duration}
            </p>
          </div>
        ))
      ) : (
        <div className="profile-info-box">
          <p>No available sessions set for this tutor.</p>
          <p style={{ fontSize: '0.9em', marginTop: '8px', color: '#666' }}>
            Click "Set Availability" above to schedule new sessions.
          </p>
        </div>
      )}

      <div className="profile-info-badges">
        <p className="profile-info-badges-head">Badges:</p>
        <div className="profile-info-no-badges">No badges yet.</div>
      </div>
    </div>
  );
};

export default ProfileInfo;