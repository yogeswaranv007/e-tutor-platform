import React from 'react';
import Header from '../components/common/Header.jsx';
import PendingAssignments from '../components/AssignmentStatus/PendingAssignments.jsx';
import CompletedAssignments from '../components/AssignmentStatus/CompletedAssignments.jsx';
import UpcomingSessions from '../components/AssignmentStatus/UpcomingSessions.jsx';
import CompletedSessions from '../components/AssignmentStatus/CompletedSessions.jsx';
import FooterMessage from '../components/AssignmentStatus/FooterMessage.jsx';
import '../styles/AssignmentStatus/AssignmentStatus.css';

const AssignmentStatus = () => {
  return (
    <div>
      <Header />
      <div className="assignment-status-container">
        <div className="assignments-section">
          <PendingAssignments />
          <CompletedAssignments />
        </div>

        <div className="sessions-section">
          <UpcomingSessions />
          <CompletedSessions />
        </div>

        <FooterMessage />
      </div>
    </div>
  );
};

export default AssignmentStatus;
