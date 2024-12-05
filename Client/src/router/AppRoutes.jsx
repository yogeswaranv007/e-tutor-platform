// router/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import FindTutors from "../Pages/FindTutors";
import SubscriptionPlans from "../components/homepage/SubscriptionPlans";
import PaymentPage from "../Pages/SubscribePage";
import StudentDashboard from "../pages/";
import TutorDashboard from "../pages/TutorDashboard.jsx";
import AssignmentStatus from "../pages/AssignmentStatus.jsx";
import AssignmentPendingPage from "../pages/AssignmentPending.jsx";
import Signup from "../components/Signup/Signup.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/tutor-dashboard" element={<TutorDashboard />} />
      <Route path="/assignment-status" element={<AssignmentStatus />} />
      <Route path="/pending-assignments" element={<AssignmentPendingPage />} />
      <Route path="/find-tutors" element={<FindTutors />} />
      <Route path="/subscription" element={<SubscriptionPlans />} />
      <Route path="/payment" element={<PaymentPage />} />
    </Routes>
  );
}

export default AppRoutes;
