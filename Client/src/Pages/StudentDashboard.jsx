// StudentDashboard.jsx
import React from 'react';
import Header from '../Components/StudentDashboard/Header.jsx'; // Header Component (Navbar)
import PlanDetails from '../Components/StudentDashboard/PlanDetails.jsx'; // Plan Details Component
import ScheduledLessons from '../Components/StudentDashboard/ScheduledLessons.jsx'; // Scheduled Lessons Component
import LastAttendedTutors from '../Components/StudentDashboard/LastAttendedTutors.jsx'; // Last Attended Tutors Component
import StudentProgress from '../Components/StudentDashboard/StudentProgress.jsx'; // Student Progress Component
import '../Styles/StudentDashboard/StudentDashboard.css'; // Custom styles for the dashboard page

const StudentDashboard = () => {
  return (
    <div className="student-dashboard">
      <Header />
      <div className="dashboard-container">
        <div className="left-side">
          <PlanDetails />
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
