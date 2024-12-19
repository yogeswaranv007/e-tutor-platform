import React, { useState, useEffect } from 'react';
import './../styles/profile.css';
import Tutor2 from './../assets/Tutor2.png';
import { useAuth } from './../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function TutorProfile() {
  const { user, updateProfilePicture, removeProfilePicture } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: '',
    gender: '',
    location: '',
    birthday: '',
    bio: '',
    linkedin: '',
    education: '',
    profession: '',
    experience: '',
    expertiseIn: '',
    hourlyRate: '',
    skills: [],
  });

  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [image, setImage] = useState(user?.profilePicture || Tutor2);
  const [loading, setLoading] = useState(true);

  // Fetch profile data when component mounts
  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    fetchProfile();
  }, [user, navigate]);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile', {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        if (data.profilePicture) {
          setImage(data.profilePicture);
          updateProfilePicture(data.profilePicture);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (field, value) => {
    setEditField(field);
    if (Array.isArray(value)) {
      setEditValue(value.join(', '));
    } else {
      setEditValue(value || '');
    }
  };

  const saveEdit = async () => {
    try {
      const updatedValue = editField === 'skills'
        ? editValue.split(',').map(v => v.trim()).filter(v => v)
        : editValue;

      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ [editField]: updatedValue }),
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setEditField(null);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Image = event.target.result;
        try {
          const response = await fetch('/api/profile/picture', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`,
            },
            body: JSON.stringify({ profilePicture: base64Image }),
          });

          if (response.ok) {
            setImage(base64Image);
            updateProfilePicture(base64Image);
          }
        } catch (error) {
          console.error('Error updating profile picture:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePicture = async () => {
    try {
      const response = await fetch('/api/profile/picture', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ profilePicture: null }),
      });

      if (response.ok) {
        setImage(Tutor2);
        removeProfilePicture();
      }
    } catch (error) {
      console.error('Error removing profile picture:', error);
    }
  };

  if (!user) return null;
  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="tutor-profile-page">
      <div className="tutor-profile-card">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="image-container">
            <img src={image} alt="Profile" className="profile-image" />
            <label htmlFor="file-upload" className="edit-image-icon">
              &#9998;
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            {image !== Tutor2 && (
              <button
                className="remove-image-icon"
                onClick={handleRemoveProfilePicture}
                title="Remove Profile Picture"
              >
                ✖
              </button>
            )}
          </div>
          <div className="profile-info">
            <p className="profile-username">{user.username}</p>
            <p className="profile-name">
              {editField === 'name' ? (
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="inline-input"
                />
              ) : (
                profile.name || 'Enter your name'
              )}
              <span className="edit-icon" onClick={() => handleEdit('name', profile.name)}>
                &#9998;
              </span>
              {editField === 'name' && (
                <span className="save-icon" onClick={saveEdit}>
                  ✔
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="details-container">
          <div className="profile-details">
            {Object.entries(profile).map(([field, value]) => {
              // Skip fields that shouldn't be displayed
              if (['_id', '__v', 'userId', 'userType', 'name', 'profilePicture', 'createdAt', 'updatedAt'].includes(field)) {
                return null;
              }

              return (
                <div key={field} className="profile-row">
                  <span className="profile-label">{field.charAt(0).toUpperCase() + field.slice(1)}</span>
                  {editField === field ? (
                    field === 'birthday' ? (
                      <input
                        type="date"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="inline-input"
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder={`Enter your ${field}`}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="inline-input"
                      />
                    )
                  ) : (
                    <span className="profile-value">
                      {Array.isArray(value)
                        ? value.length
                          ? value.map((v, i) => <span key={i} className="skill-tag">{v}</span>)
                          : `Enter your ${field}`
                        : value || `Enter your ${field}`}
                    </span>
                  )}
                  {editField === field ? (
                    <span className="save-icon" onClick={saveEdit}>
                      ✔
                    </span>
                  ) : (
                    <span className="edit-link" onClick={() => handleEdit(field, value)}>
                      Edit
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorProfile;
