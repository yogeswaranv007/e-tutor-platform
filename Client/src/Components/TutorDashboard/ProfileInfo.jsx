import React from 'react';
import "../../Styles/TutorDashboard/ProfileInfo.css";
import Tutor1 from "../../assets/Tutor1.png";

const ProfileInfo = () => {
  const handleClick = () => {
    alert('Set your availability here');
  };

  return (
    <div className="profile-info-container">
      <h2>Tutor Dashboard</h2>
      <img
        src={Tutor1} /* Replace with actual tutor image */
        alt="Tutor"
        className="profile-info-image"
      />
      <div className="profile-info-name">Ana de Armas</div>
      <div className="profile-info-email">anadearmas@gmail.com</div>
      <div className="profile-info-location">India</div>

      <div className="set-availability-btn-container">
        <button className="set-availability-btn" onClick={handleClick}>
          Set Availability
        </button>
      </div>

      <div className="profile-info-separator"></div>

      <div className="profile-info-specialization">
        <div className="profile-info-specialization-head">Specialization:</div>
        <div className="profile-info-specialization-badge">Python</div>
        <div className="profile-info-specialization-badge">HTML</div>
        <div className="profile-info-specialization-badge">Java</div>
      </div>

      {/* Experience section wrapped in a styled box */}
      <p className="profile-info-experience-head">Experience:</p>
      <div className="profile-info-box">
        <p className='profile-info-experience-content'>5+ Years of Tutoring Experience</p>
      </div>

      {/* Confirmed Sessions section wrapped in a styled box */}
      <p className='profile-info-confirmed-sessions-head'>Confirmed Sessions:</p>
      <div className="profile-info-box">
        
        <p>24 October 2024</p>
        <p> 13:00 - 14:00</p>
      </div>

      <div className="profile-info-badges">
        <p className='profile-info-badges-head'>Badges:</p>
        <div className="profile-info-no-badges">No batches yet.</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
