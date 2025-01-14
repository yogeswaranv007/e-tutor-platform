import React, { useState, useEffect } from 'react';
import './../styles/profile.css';
import ProfileIcon from './../assets/ProfileIcon.png';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function TutorProfile() {
  const { user } = useAuth();
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
    TutoringTopics: '',
    hourlyRate: '',
    TutoringLanguage: [],
    skills: [],
  });
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [profileImage, setProfileImage] = useState(ProfileIcon);

  const orderedFields = [
    'name',
    'gender',
    'location',
    'birthday',
    'bio',
    'linkedin',
    'education',
    'profession',
    'experience',
    'expertiseIn',
    'TutoringTopics',
    'hourlyRate',
    'TutoringLanguage',
    'skills'
  ];

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchProfileData();
    fetchProfileImage();
  }, [user, navigate]);

  const fetchProfileImage = async () => {
    try {
      if (!user) return;

      const response = await axios.get(`/api/profile/image/${user._id}`, {
        params: { userType: user.userType },
        responseType: 'arraybuffer'
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const imageUrl = URL.createObjectURL(blob);
      setProfileImage(imageUrl);
    } catch (error) {
      console.error('Failed to fetch profile image:', error);
      setProfileImage(ProfileIcon);
    }
  };

  const fetchProfileData = async () => {
    try {
      if (!user) return;

      const response = await axios.get('/api/profile', {
        params: {
          userId: user._id,
          userType: user.userType
        }
      });

      if (response.data.success) {
        const filteredProfile = Object.fromEntries(
          Object.entries(response.data.profile)
            .filter(([key]) => orderedFields.includes(key))
        );
        setProfile(filteredProfile);
      }
    } catch (error) {
      console.error('Failed to fetch profile data:', error);
    }
  };

  const handleEdit = (field, value) => {
    setEditField(field);
    setEditValue(Array.isArray(value) ? value.join(', ') : value);
  };

  const renderInputField = (field, value) => {
    switch (field) {
      case 'birthday':
        return (
          <input
            type="date"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="edit-input"
          />
        );
      case 'bio':
        return (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="edit-input"
            rows="3"
          />
        );
      case 'hourlyRate':
        return (
          <input
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="edit-input"
          />
        );
      case 'skills':
        return (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="edit-input"
            placeholder="Separate skills with commas"
          />
        );
      case 'TutoringLanguage':
        return (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="edit-input"
            placeholder="Separate languages with commas"
          />
        );
      default:
        return (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="edit-input"
          />
        );
    }
  };

  const saveEdit = async () => {
    try {
      if (!user?._id) {
        console.error('User not authenticated');
        return;
      }
  
      const updatedProfile = {
        ...profile,
        [editField]: editField === 'skills' || editField === 'TutoringLanguage' 
          ? editValue.split(',').map(v => v.trim())
          : editValue,
        userId: user._id,
        userType: user.userType
      };
  
      const response = await axios.put('/api/profile', updatedProfile);
      
      if (response.data.success) {
        setProfile(response.data.profile);
        setEditField(null);
      } else {
        console.error('Failed to update profile:', response.data.error);
      }
    } catch (error) {
      console.error('Failed to save profile:', error?.response?.data?.error || error.message);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && user?._id) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('userId', user._id);
        formData.append('userType', user.userType);
  
        const response = await axios.post('/api/profile/image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
  
        if (response.data.success) {
          await fetchProfileImage();
        } else {
          console.error('Failed to upload image:', response.data.error);
        }
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    } else {
      console.error('No file selected or user not authenticated');
    }
  };

  const handleSkillAdd = async () => {
    if (newSkill.trim()) {
      try {
        const updatedSkills = [...profile.skills, newSkill.trim()];
        
        const response = await axios.put('/api/profile', {
          ...profile,
          skills: updatedSkills,
          userId: user._id,
          userType: user.userType
        });

        if (response.data.success) {
          setProfile(response.data.profile);
          setNewSkill('');
        }
      } catch (error) {
        console.error('Error adding skill:', error);
      }
    }
  };

  return (
    <div className="tutor-profile-page">
      <div className="tutor-profile-card">
        <div className="profile-header">
          <div className="image-container">
            <img src={profileImage} alt="Profile" className="profile-image" />
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
          </div>
          <div className="profile-name-container">
            <p className="profile-username">{user?.username || 'Unknown Tutor'}</p>
          </div>
        </div>

        <div className="details-container">
          <div className="profile-details">
            {orderedFields.map(field => (
              <div key={field} className="profile-row">
                <span className="profile-label">
                  {field === 'TutoringLanguage' ? 'Tutoring Languages' : field.charAt(0).toUpperCase() + field.slice(1)}
                </span>
                {editField === field ? (
                  <>
                    {renderInputField(field, profile[field])}
                    <span className="save-icon" onClick={saveEdit}>✔</span>
                  </>
                ) : (
                  <>
                    <span className="profile-value">
                      {field === 'skills' ? (
                        <div className="skills-container">
                          {Array.isArray(profile[field]) && profile[field].length > 0 ? (
                            profile[field].map((skill, index) => (
                              <span key={index} className="skill-tag">{skill}</span>
                            ))
                          ) : (
                            'Enter your skills'
                          )}
                          <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Add skill"
                            className="inline-input"
                          />
                          <button className="add-skill-button" onClick={handleSkillAdd}>
                            Add Skill
                          </button>
                        </div>
                      ) : field === 'TutoringLanguage' ? (
                        Array.isArray(profile[field]) && profile[field].length > 0 ?
                          profile[field].join(', ') :
                          'Enter your tutoring languages'
                      ) : field === 'hourlyRate' ? (
                        profile[field] ? `${profile[field]}/hr` : 'Enter your hourly rate'
                      ) : field === 'birthday' ? (
                        profile[field] ? new Date(profile[field]).toLocaleDateString() : 'Enter your birthday'
                      ) : profile[field] || `Enter your ${field}`}
                    </span>
                    <span className="edit-link" onClick={() => handleEdit(field, profile[field] || '')}>
                      Edit
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorProfile;