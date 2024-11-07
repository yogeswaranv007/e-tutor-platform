import React from 'react';
import '../../Styles/AssignmentStatus/CompletedSessions.css';

const CompletedSessions = () => {
  const sessions = [
    { subject: 'Python', date: '18 October 2024', time: '11:00 - 12:00' },
    { subject: 'Java', date: '17 October 2024', time: '11:00 - 12:00' },
    { subject: 'HTML', date: '16 October 2024', time: '11:00 - 12:00' }
  ];

  return (
    <div className="completed-sessions">
      <h3>Sessions Completed:</h3>
      {sessions.map((session, index) => (
        <div key={index} className="session-item">
          <span>{session.subject}</span>
          <span>{session.date}</span>
          <span>{session.time}</span>
          <span className="status-completed">Completed</span>
        </div>
      ))}
    </div>
  );
};

export default CompletedSessions;
