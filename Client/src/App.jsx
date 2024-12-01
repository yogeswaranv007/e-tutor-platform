// App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import AppRoutes from "./router/AppRoutes";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
