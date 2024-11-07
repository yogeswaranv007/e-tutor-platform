// PlanDetails.js
import React from 'react';
import "../../Styles/StudentDashboard/PlanDetails.css";

const PlanDetails = () => {
  return (
    <div className="plan-details">
      <h3>Plan Details</h3>
      <ul>
        <li><strong>Plan:</strong> Standard</li>
        <li><strong>Price:</strong> Rs.1499</li>
        <li><strong>Validity:</strong> 30 days</li>
        <li><strong>Date:</strong> 11 October 2024</li>
        <li><strong>Tutoring sessions:</strong> 5/day</li>
        <li><strong>Users:</strong> 1</li>
      </ul>
      <p className="remaining-days">Remaining Days: <strong>25</strong></p>
    </div>
  );
}

export default PlanDetails;
