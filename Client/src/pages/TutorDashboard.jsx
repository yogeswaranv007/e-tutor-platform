import React from 'react';
import ProfileInfo from '../components/TutorDashboard/ProfileInfo';
import BookedSessions from '../components/TutorDashboard/BookedSessions';
import TutorAchievements from '../components/TutorDashboard/TutorAchievements';
import "../styles/TutorDashboard/TutorDashboard.css";

const TutorDashboard = () => {
  return (
    <>
      <div className="tutor-dashboard">
        <div className="left-section">
          <ProfileInfo />
        </div>
        <div className="right-section">
          <BookedSessions />
          <TutorAchievements />
        </div>
      </div>
    </>
  );
}

export default TutorDashboard;
