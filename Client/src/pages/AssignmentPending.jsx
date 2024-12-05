import React from 'react';
import Header from '../components/common/Header.jsx';
import SubjectHeader from '../components/AssignmentPending/SubjectHeader.jsx';
import QuestionBox from '../components/AssignmentPending/QuestionBox.jsx';
import AnswerSubmission from '../components/AssignmentPending/AnswerSubmission.jsx';
import FileUpload from '../components/AssignmentPending/FileUpload.jsx';
import '../styles/AssignmentPending/AssignmentPendingPage.css';

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
