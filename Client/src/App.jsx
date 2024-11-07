import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import FindTutors from "./pages/FindTutors";
import SubscriptionPlans from "./components/SubscriptionPlans";
import PaymentPage from "./pages/SubscribePage";

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
