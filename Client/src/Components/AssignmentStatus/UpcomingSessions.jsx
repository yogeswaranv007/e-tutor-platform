import React from 'react';
import '../../Styles/AssignmentStatus/UpcomingSessions.css';

const UpcomingSessions = () => {
  return (
    <div className="upcoming-sessions">
      <h3>Upcoming Sessions:</h3>
      <div className="upcoming-item">
        <span>Algebra</span>
        <span>24 October 2024</span>
        <span className="status-upcoming">Upcoming</span>
      </div>
    </div>
  );
};

export default UpcomingSessions;
