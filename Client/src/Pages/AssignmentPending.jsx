import React from 'react';
import Header from '../Components/StudentDashboard/Header.jsx';
import SubjectHeader from '../Components/AssignmentPending/SubjectHeader.jsx';
import QuestionBox from '../Components/AssignmentPending/QuestionBox.jsx';
import AnswerSubmission from '../Components/AssignmentPending/AnswerSubmission.jsx';
import FileUpload from '../Components/AssignmentPending/FileUpload.jsx';
import '../Styles/AssignmentPending/AssignmentPendingPage.css';

const AssignmentPendingPage = () => {
  return (
    <div>
      <Header />
      <div className="assignment-pending-container">
        <div className="assignment-box">
          <SubjectHeader subject="Algebra" timeRemaining="24 hours remaining" tutor="Ana de Armas" />
          <QuestionBox />
          <AnswerSubmission />
          <FileUpload />
        </div>
      </div>
    </div>
  );
};

export default AssignmentPendingPage;
