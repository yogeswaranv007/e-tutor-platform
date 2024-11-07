import React from 'react';
import Header from '../Components/TutorDashboard/Header';
import ProfileInfo from '../Components/TutorDashboard/ProfileInfo';
import BookedSessions from '../Components/TutorDashboard/BookedSessions';
import TutorAchievements from '../Components/TutorDashboard/TutorAchievements';
import "../Styles/TutorDashboard/TutorDashboard.css";

const TutorDashboard = () => {
  return (
    <>
      <Header />
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
