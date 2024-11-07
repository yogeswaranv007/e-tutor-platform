import React from 'react';
import '../../Styles/AssignmentPending/SubjectHeader.css';

const SubjectHeader = ({ subject, timeRemaining, tutor }) => {
  return (
    <div className="subject-header">
      <h1>{subject}</h1>
      <div className="time-remaining">
        <p>{timeRemaining}</p>
        <p>Tutor: {tutor}</p>
      </div>
    </div>
  );
};

export default SubjectHeader;
