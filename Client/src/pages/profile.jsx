// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './../styles/profile.css';
// import Tutor2 from './../assets/Tutor2.png';
// import { useAuth } from './../context/AuthContext';

// function Profile() {
//   const { user, updateProfilePicture, removeProfilePicture } = useAuth();
//   const navigate = useNavigate();

//   // If no user is logged in, redirect to home or login
//   useEffect(() => {
//     if (!user) {
//       navigate('/login');
//     }
//   }, [user, navigate]);

//   const [profile, setProfile] = useState({
//     name: user?.name || '',
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
//   const [image, setImage] = useState(user?.profilePicture || Tutor2);

//   // Handle Edit
//   const handleEdit = (field, value) => {
//     setEditField(field);
//     if (Array.isArray(value)) {
//       setEditValue(value.join(', ')); // Convert array to string for editing
//     } else {
//       setEditValue(value);
//     }
//   };

//   // Save Edit
//   const saveEdit = () => {
//     setProfile((prev) => ({
//       ...prev,
//       [editField]: editField === 'skills' ? editValue.split(',').map((v) => v.trim()) : editValue,
//     }));
//     setEditField(null);
//   };

//   // Handle Image Upload
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const base64Image = event.target.result;
//         setImage(base64Image);
        
//         // Call method to update profile picture in AuthContext
//         updateProfilePicture(base64Image);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // New method to handle profile picture removal
//   const handleRemoveProfilePicture = () => {
//     setImage(Tutor2);
//     removeProfilePicture();
//   };

//   // If no user is logged in, return null or a loading state
//   if (!user) {
//     return null;
//   }

//   return (
//     <div className="profile-page">
//       <div className="profile-card">
//         {/* Profile Header */}
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
//             {/* Add remove button only if profile picture exists */}
//             {user?.profilePicture && (
//               <button 
//                 className="remove-image-icon" 
//                 onClick={handleRemoveProfilePicture}
//                 title="Remove Profile Picture"
//               >
//                 ✖
//               </button>
//             )}
//           </div>
//           <div className="profile-info">
//             <p className="profile-username">{user.username}</p>
//             <p className="profile-name">
//               {editField === 'name' ? (
//                 <input
//                   type="text"
//                   placeholder="Enter your name"
//                   value={editValue}
//                   onChange={(e) => setEditValue(e.target.value)}
//                   className="inline-input"
//                 />
//               ) : (
//                 profile.name || 'Enter your name'
//               )}
//               <span className="edit-icon" onClick={() => handleEdit('name', profile.name || '')}>
//                 &#9998;
//               </span>
//               {editField === 'name' && (
//                 <span className="save-icon" onClick={saveEdit}>
//                   ✔
//                 </span>
//               )}
//             </p>
//           </div>
//         </div>

//         {/* Rest of the component remains unchanged */}
//         {/* Profile Details */}
//         <div className="details-container">
//           <div className="profile-details">
//             {Object.entries(profile).map(([field, value]) => (
//               <div key={field} className="profile-row">
//                 <span className="profile-label">{field.charAt(0).toUpperCase() + field.slice(1)}</span>
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
//                     {Array.isArray(value)
//                       ? value.length
//                         ? value.map((v, i) => <span key={i} className="skill-tag">{v}</span>)
//                         : `Enter your ${field}`
//                       : value || `Enter your ${field}`}
//                   </span>
//                 )}
//                 {editField === field ? (
//                   <span className="save-icon" onClick={saveEdit}>
//                     ✔
//                   </span>
//                 ) : (
//                   <span className="edit-link" onClick={() => handleEdit(field, value || '')}>
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



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './../styles/profile.css';
import Tutor2 from './../assets/Tutor2.png';
import { useAuth } from './../context/AuthContext';

function Profile() {
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
    skills: [],
  });

  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [image, setImage] = useState(user?.profilePicture || Tutor2);
  const [loading, setLoading] = useState(true);

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
          'Authorization': `Bearer ${user.token}`
        }
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
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ [editField]: updatedValue })
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
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ profilePicture: base64Image })
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
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ profilePicture: null })
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
    <div className="profile-page">
      <div className="profile-card">
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

export default Profile;
