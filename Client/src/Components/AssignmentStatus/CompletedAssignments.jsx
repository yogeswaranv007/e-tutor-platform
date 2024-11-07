import React from 'react';
import '../../Styles/AssignmentStatus/CompletedAssignments.css';

const CompletedAssignments = () => {
  const assignments = [
    { subject: 'Python', status: 'Completed', marks: 90 },
    { subject: 'Java', status: 'Completed', marks: 100 },
    { subject: 'HTML', status: 'Completed', marks: 80 }
  ];

  const totalMarks = assignments.reduce((acc, assignment) => acc + assignment.marks, 0);
  const averageMarks = (totalMarks / assignments.length).toFixed(2);

  return (
    <div className="completed-assignments">
      <h3>Assignments Completed:</h3>
      {assignments.map((assignment, index) => (
        <div key={index} className="completed-item">
          <span>{assignment.subject}</span>
          <span>{assignment.status}</span>
          <span>{assignment.marks} Marks</span>
        </div>
      ))}
      <p>Assignment percentage: {averageMarks}%</p>
    </div>
  );
};

export default CompletedAssignments;
