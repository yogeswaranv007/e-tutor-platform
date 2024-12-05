import React from 'react';
import Header from '../components/common/Header.jsx';
import PlanDetails from '../components/StudentDashboard/PlanDetails.jsx';
import ScheduledLessons from '../components/StudentDashboard/ScheduledLessons.jsx';
import LastAttendedTutors from '../components/StudentDashboard/LastAttendedTutors.jsx';
import StudentProgress from '../components/StudentDashboard/StudentProgress.jsx';
import '../styles/StudentDashboard/StudentDashboard.css';

const StudentDashboard = () => {
  return (
    <div className="student-dashboard">
      <Header />
      <div className="dashboard-container">
        <div className="left-side">
          <div className='plan'>
          <PlanDetails />
          </div>
          <div className="lastAttendedTutors">
            <LastAttendedTutors />
          </div>
        </div>
        <div className="right-side">
          <ScheduledLessons />
          <StudentProgress />
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
