// router/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import FindTutors from "../Pages/FindTutors";
import SubscriptionPlans from "../components/homepage/SubscriptionPlans";
import PaymentPage from "../Pages/SubscribePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/find-tutors" element={<FindTutors />} />
      <Route path="/subscription" element={<SubscriptionPlans />} />
      <Route path="/payment" element={<PaymentPage />} />
    </Routes>
  );
}

export default AppRoutes;
