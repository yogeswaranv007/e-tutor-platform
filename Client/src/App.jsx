import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import HomePage from "./Pages/HomePage";
import FindTutors from "./Pages/FindTutors";
import SubscriptionPlans from "./components/homepage/SubscriptionPlans";
import PaymentPage from "./Pages/SubscribePage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/find-tutors" element={<FindTutors />} />
        <Route path="/subscription" element={<SubscriptionPlans />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
