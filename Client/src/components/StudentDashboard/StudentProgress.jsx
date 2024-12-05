import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import "../../styles/StudentDashboard/StudentProgress.css";
import SlideUp from "../../assets/Slide Up.png"; 

const StudentProgress = () => {
  const navigate = useNavigate();  

  const handleNavigate = () => {
    navigate('/assignment-status');  
  };

  return (
    <div className="student-progress">
      <div className="header">
        <h3>Student Progress</h3>
        <img 
          src={SlideUp} 
          alt='Slide-next' 
          className="slide-up-image" 
          onClick={handleNavigate} 
        />
      </div>
      <div className="progress-grid">
        <div className="progress-item">
          <strong>Sessions Attended:</strong>
          <p>10</p>
        </div>
        <div className="progress-item">
          <strong>Assignments Pending:</strong>
          <p>1</p>
        </div>
        <div className="progress-item">
          <strong>Assignments Attended:</strong>
          <p>10</p>
        </div>
        <div className="progress-item">
          <strong>Assignment Percentage:</strong>
          <p>90%</p>
        </div>
      </div>
    </div>
  );
}

export default StudentProgress;
