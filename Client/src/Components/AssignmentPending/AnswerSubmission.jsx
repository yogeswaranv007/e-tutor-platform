import React from 'react';
import '../../Styles/AssignmentPending/AnswerSubmission.css';

const AnswerSubmission = () => {
  const handleSubmit = () => {
    // Logic for submitting answer goes here
    window.location.href = '/student-dashboard';
  };

  return (
    <div className="answer-submission">
      <h3>Submit</h3>
      <textarea placeholder="Type your answer here..."></textarea>
      <div className='sub-but'>
       <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AnswerSubmission;
