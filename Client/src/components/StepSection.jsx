import React from 'react';
import '../styles/StepSection.css';
import tutorIcon from '../assets/tutor-icon.png';
import calendarIcon from '../assets/calendar-icon.png'; 
import assignmentIcon from '../assets/assignment-icon.png';
const StepSection = () => {
  return (
    <div className="step-section">
      <h2 className="main-title">
        Major <span className="highlight">Steps</span> To Follow
      </h2>
      <div className="steps-container">
        <div className="step-card">
          <img src={tutorIcon} alt="Choose Your Tutor" className="step-icon" />
          <h3 className="step-title">Choose Your Tutor</h3>
          <p className="step-description">
            Browse through expert tutors in various subjects and select the one that fits your learning style and needs.
          </p>
        </div>
        <div className="step-card">
          <img src={calendarIcon} alt="Book Your Session" className="step-icon" />
          <h3 className="step-title">Book Your Session</h3>
          <p className="step-description">
            Easily schedule one-on-one live tutoring sessions at a time that works for you with just a few clicks.
          </p>
        </div>
        <div className="step-card">
          <img src={assignmentIcon} alt="Learn And Track Assignment" className="step-icon" />
          <h3 className="step-title">Learn And Track Assignment</h3>
          <p className="step-description">
            Engage in interactive learning and keep track of your assignments, deadlines, and progress all in one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepSection;
