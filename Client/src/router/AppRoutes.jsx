import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import FindTutors from "../pages/FindTutors.jsx";
import SubscriptionPlans from "../components/homepage/SubscriptionPlans";
import PaymentPage from "../Pages/SubscribePage";
import StudentDashboard from "../pages/StudentDashboard.jsx";
import TutorDashboard from "../pages/TutorDashboard.jsx";
import AssignmentStatus from "../pages/AssignmentStatus.jsx";
import AssignmentPendingPage from "../pages/AssignmentPending.jsx";
import Signup from "../components/Signup/Signup.jsx";
import SessionPage from "../components/one-to-one-Integration/SessionPage.jsx"
import Availability from "../components/SetAvailability/SetAvailability.jsx"
import Profile from '../pages/profile.jsx';
import TutorProfile from '../pages/TutorProfile.jsx';
import ProtectedRoute from "./ProtectedRuoute.jsx";
import { useAuth } from "../context/AuthContext.jsx"

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/tutor-profile" element={<TutorProfile />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/session" element={<SessionPage/>} />
      <Route path="/tutor-dashboard" element={<TutorDashboard />} />
      <Route path="/assignment-status" element={<AssignmentStatus />} />
      <Route path="/pending-assignments" element={<AssignmentPendingPage />} />
      <Route path="/find-tutors" element={<FindTutors />} />
      <Route path="/subscription" element={<SubscriptionPlans />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/set-availability" element={<Availability />} />
    </Routes>
  );
}

export default AppRoutes;
