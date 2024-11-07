import React from 'react';
import "../../Styles/StudentDashboard/ScheduledLessons.css";
import Tutor1 from "../../assets/Tutor1.png";
import Tutor2 from "../../assets/Tutor2.png";
import ThreeDot from '../../assets/ThreeDot.png';

const ScheduledLessons = () => {
  return (
    <div className="scheduled-lessons">
      <h3>Scheduled Lessons</h3>
      <div className="lessons-container">
        <div className="lesson-box">
          <div className="lesson-header">
            <img src={Tutor2} alt="Sydney Sweeney" className="tutor-image" />
            <img src={ThreeDot} alt="Options" className="options-icon" />
          </div>
          <div className="lesson-content">
            <p><strong>Date:</strong> 11 October 2024</p>
            <p><strong>Time:</strong> 10 am - 11 am</p>
            <p><strong>Lesson:</strong> Algebra</p>
            <button>Start Session</button>
          </div>
        </div>
        <div className="lesson-box">
          <div className="lesson-header">
            <img src={Tutor1} alt="Ana de Armas" className="tutor-image" />
            <img src={ThreeDot} alt="Options" className="options-icon" />
          </div>
          <div className="lesson-content">
            <p><strong>Date:</strong> 11 October 2024</p>
            <p><strong>Time:</strong> 1 pm - 2 pm</p>
            <p><strong>Lesson:</strong> Geometry</p>
            <button>Start Session</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduledLessons;
