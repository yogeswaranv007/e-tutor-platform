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
import { useAuth } from "../context/AuthContext.jsx"
import About from '../pages/AboutPage.jsx'
import Chatbox from "../components/Chatbox/chatbox.jsx";
import SearchTut from "../components/Searchtut/searchtut.jsx";
import Calendar from "../components/Sessionbook/sessionbook.jsx"
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
      <Route path="/about" element={<About/>} />
      <Route path="/chats" element={<Chatbox/>} />
      <Route path="/view-profile/:tutorId" element={<SearchTut />} />
      <Route path="/book-session" element={<Calendar/>} />
    </Routes>
  );
}

export default AppRoutes;
