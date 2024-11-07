import React from 'react';
import '../../Styles/TutorDashboard/BookedSessions.css';
import Tutor1 from "../../assets/Tutor1.png"; // Example tutor image
import ThreeDot from "../../assets/ThreeDot.png"; // Options icon

const BookedSessions = () => {
  const sessions = [
    {
      studentName: 'Jesse Pinkman',
      date: '11 October 2024',
      time: '10 am - 11 am',
      lesson: 'Algebra',
      tutorImage: Tutor1, // Assign a tutor image for each session
    },
    {
      studentName: 'Jane Margolis',
      date: '11 October 2024',
      time: '1 pm - 2 pm',
      lesson: 'Geometry',
      tutorImage: Tutor1, // Another tutor image (you can assign different ones if needed)
    },
  ];

  return (
    <div className="booked-sessions">
      <h3>Booked Sessions</h3>
      <div className="sessions-container">
        {sessions.map((session, index) => (
          <div key={index} className="session-box">
            <div className="session-header">
              <img src={session.tutorImage} alt="Tutor" className="tutor-image" />
              <img src={ThreeDot} alt="Options" className="options-icon" />
            </div>
            <div className="session-content">
              <h4><strong>{session.studentName}</strong></h4>
              <p><strong>Date:</strong> {session.date}</p>
              <p><strong>Time:</strong> {session.time}</p>
              <p><strong>Lesson:</strong> {session.lesson}</p>
            </div>
            <button className="start-live-button">Start Live</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookedSessions;
