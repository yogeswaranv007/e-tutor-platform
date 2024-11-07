import React from 'react';
import '../../Styles/AssignmentStatus/PendingAssignments.css';
import SlideUp from '../../assets/Slide Up.png'

const PendingAssignments = () => {
  return (
    <div className="pending-assignments">
      <h3>Assignments Pending:</h3>
      <div className="pending-item">
        <span>Algebra</span>
        <span className="pending-status">Pending...</span>
        <button className="pending-icon" onClick={() => window.location.href = '/pending-assignments'}>
          <img src={SlideUp} />
        </button>
      </div>
    </div>
  );
};

export default PendingAssignments;
