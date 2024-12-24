import React, { useState, useEffect } from 'react';
import './../styles/profile.css';
import ProfileIcon from './../assets/ProfileIcon.png';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
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
    skills: [],
  });

  const orderedFields = [
    'name',
    'gender',
    'location',
    'birthday',
    'bio',
    'linkedin',
    'education',
    'skills'
  ];

  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [profileImage, setProfileImage] = useState(ProfileIcon);

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
        setProfile(response.data.profile);
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
      if (!user) {
        console.error('User not authenticated');
        return;
      }

      const updatedProfile = {
        ...profile,
        [editField]: editField === 'skills' ? editValue.split(',').map(v => v.trim()) : editValue,
        userId: user._id,
        userType: user.userType
      };

      const response = await axios.put('/api/profile', updatedProfile);
      if (response.data.success) {
        setProfile(response.data.profile);
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
    setEditField(null);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('userId', user._id);
        formData.append('userType', user.userType);

        await axios.post('/api/profile/image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        
        fetchProfileImage();
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
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
    <div className="profile-page">
      <div className="profile-card">
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
            <p className="profile-username">{user?.username || 'Unknown Student'}</p>
          </div>
        </div>

        <div className="details-container">
          <div className="profile-details">
            {orderedFields.map(field => (
              <div key={field} className="profile-row">
                <span className="profile-label">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
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
                      ) : field === 'birthday' ? (
                        profile[field] ? profile[field].split('T')[0] : 'Enter your birthday'
                      ) : (
                        profile[field] || `Enter your ${field}`
                      )}
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

export default Profile;

// import React, { useState, useEffect } from 'react';
// import './../styles/profile.css';
// import Tutor2 from './../assets/Tutor2.png';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// function Profile() {
//   const { user } = useAuth(); // Access user from context
//   const [profile, setProfile] = useState({
//     name: '',
//     gender: '',
//     location: '',
//     birthday: '',
//     bio: '',
//     linkedin: '',
//     education: '',
//     skills: [],
//   });
//   const [editField, setEditField] = useState(null);
//   const [editValue, setEditValue] = useState('');
//   const [image, setImage] = useState(Tutor2);
//   const [newSkill, setNewSkill] = useState('');
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       const token = localStorage.getItem('token'); // Get token from localStorage

//       if (!user?.id || !token) {
//         setError('User ID or token not found.');
//         navigate('/'); // Redirect to login page if user/token is missing
//         return;
//       }

//       try {
//         // Determine the API endpoint based on the user type
//         const endpoint = user.userType === 'student' ? '/api/student/profile' : '/api/tutor/profile';

//         const response = await axios.get(endpoint, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.data.profile) {
//           setProfile(response.data.profile);
//         }
//       } catch (error) {
//         console.error('Failed to fetch profile data:', error);
//         setError('Failed to load profile data. Please try again later.');
//       }
//     };

//     if (user) {
//       fetchProfileData();
//     }
//   }, [user, navigate]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result); // Update the image state with the new image data
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleEdit = (field, value) => {
//     setEditField(field);
//     setEditValue(value);
//   };

//   const saveEdit = async () => {
//     const token = localStorage.getItem('token');
//     const updatedProfile = { ...profile, [editField]: editValue };

//     try {
//       // Determine the API endpoint based on the user type
//       const endpoint = user.userType === 'student' ? '/api/student/profile' : '/api/tutor/profile';

//       const response = await axios.put(endpoint, updatedProfile, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setProfile(response.data.profile);
//       setEditField(null);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       setError('Failed to update profile. Please try again.');
//     }
//   };

//   const handleSkillAdd = () => {
//     if (newSkill && !profile.skills.includes(newSkill)) {
//       setProfile((prevProfile) => ({
//         ...prevProfile,
//         skills: [...prevProfile.skills, newSkill],
//       }));
//       setNewSkill('');
//     }
//   };

//   return (
//     <div className="profile-page">
//       {error && <div className="error-message">{error}</div>}
//       <div className="profile-card">
//         <div className="profile-header">
//           <div className="image-container">
//             <img src={image} alt="Profile" className="profile-image" />
//             <label htmlFor="file-upload" className="edit-image-icon">
//               &#9998;
//             </label>
//             <input
//               id="file-upload"
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="file-input"
//             />
//           </div>
//           <div className="profile-name-container">
//             <p className="profile-username">{user?.username || 'Unknown User'}</p>
//           </div>
//         </div>

//         <div className="details-container">
//           <div className="profile-details">
//             {Object.entries(profile).map(([field, value]) => (
//               <div key={field} className="profile-row">
//                 <span className="profile-label">
//                   {field.charAt(0).toUpperCase() + field.slice(1)}
//                 </span>
//                 {editField === field ? (
//                   field === 'birthday' ? (
//                     <input
//                       type="date"
//                       value={editValue}
//                       onChange={(e) => setEditValue(e.target.value)}
//                       className="inline-input"
//                     />
//                   ) : (
//                     <input
//                       type="text"
//                       placeholder={`Enter your ${field}`}
//                       value={editValue}
//                       onChange={(e) => setEditValue(e.target.value)}
//                       className="inline-input"
//                     />
//                   )
//                 ) : (
//                   <span className="profile-value">
//                     {field === 'skills' ? (
//                       <div className="skills-container">
//                         {value.length > 0
//                           ? value.map((skill, index) => (
//                               <span key={index} className="skill-tag">
//                                 {skill}
//                               </span>
//                             ))
//                           : 'Enter your skills'}
//                         <input
//                           type="text"
//                           value={newSkill}
//                           onChange={(e) => setNewSkill(e.target.value)}
//                           placeholder="Add skill"
//                           className="inline-input"
//                         />
//                         <button
//                           className="add-skill-button"
//                           onClick={handleSkillAdd}
//                         >
//                           Add Skill
//                         </button>
//                       </div>
//                     ) : Array.isArray(value) ? (
//                       value.length
//                         ? value.map((v, i) => (
//                             <span key={i} className="skill-tag">
//                               {v}
//                             </span>
//                           ))
//                         : `Enter your ${field}`
//                     ) : (
//                       value || `Enter your ${field}`
//                     )}
//                   </span>
//                 )}
//                 {editField === field ? (
//                   <span className="save-icon" onClick={saveEdit}>
//                     ✔
//                   </span>
//                 ) : (
//                   <span
//                     className="edit-link"
//                     onClick={() => handleEdit(field, value || '')}
//                   >
//                     Edit
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;
