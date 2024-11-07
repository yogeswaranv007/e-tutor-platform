import React from 'react';
import "../../Styles/TutorDashboard/TutorAchievements.css";

const TutorAchievements = () => {
  return (
    <div className="tutor-achievements">
      <div className="header">
        <h3>Tutor Achievements</h3>
      </div>
      <div className="achievements-grid">
        <div className="achievement-item">
          <strong>Hours Taught:</strong>
          <p>150</p>
        </div>
        <div className="achievement-item">
          <strong>Sessions Taught:</strong>
          <p>35</p>
        </div>
        <div className="achievement-item">
          <strong>Students Taught:</strong>
          <p>20</p>
        </div>
        <div className="achievement-item">
          <strong>Assignments Given:</strong>
          <p>25</p>
        </div>
        <div className="achievement-item">
          <strong>Revenue Generated:</strong>
          <p>$2000</p>
        </div>
        <div className="achievement-item">
          <strong>Sessions Cancelled:</strong>
          <p>5</p>
        </div>
      </div>
    </div>
  );
}

export default TutorAchievements;
