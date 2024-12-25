import React from 'react';
import './../../Styles/Policy/policy.css';

const Policy = () => {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1 className="policy-title">Refund <span className="policy-highlight">Policy</span></h1>
        <p className="policy-intro">
          At E-Tutor, we prioritize the satisfaction of our students and tutors.
          We understand that there may be occasions when a refund is necessary. This
          policy outlines the conditions under which refunds are processed.
        </p>

        <h2 className="section-title">Eligibility for Refunds</h2>
        <ul className="policy-list">
          <li><b>Cancellation by the Tutor</b> - If a session is canceled by the tutor, students are eligible for a full refund.</li>
          <li><b>Technical Issues</b> - If technical problems prevent the session from being conducted, the student may request a refund.</li>
          <li><b>Dissatisfaction</b> - Students who are not satisfied with a session may request a refund, subject to review.</li>
        </ul>

        <h2 className="section-title">Refund Request Process</h2>
        <ul className="policy-list">
          <li><b>Submit a Request</b> - Refund requests should be submitted within 48 hours of the session's scheduled time. Requests can be made through this <a className='link' href="#">LINK</a> or by contacting support at <a className='link' href="mailto:students-support@etutor.in">students-support@etutor.in</a>.</li>
          <li><b>Review and Approval</b> - Refund requests will be reviewed within 2 business days. If the refund is approved, the student will be notified via email.</li>
          <li><b>Refund Timeline</b> - Refunds will be processed within 5-7 business days of approval, and funds will be returned to the original payment method.</li>
        </ul>

        <h2 className="section-title">Non-Refundable Circumstances</h2>
        <ul className="policy-list">
          <li><b>No-Shows</b> - If a student does not attend the scheduled session and fails to cancel 24 hours in advance.</li>
          <li><b>Completed Sessions</b> - Sessions that have already been conducted and completed without any issues.</li>
          <li><b>Rescheduled Sessions</b> - Once a session has been rescheduled, it is considered final.</li>
        </ul>

        <h2 className="section-title">Partial Refunds</h2>
        <p className="policy-text">
          Partial refunds may be granted in cases where a session has started but was interrupted due to unforeseen circumstances.
        </p>

        <h2 className="section-title">Contact Us</h2>
        <p className="policy-text">
          If you have any questions about our refund policy or need assistance, feel free to contact our support team at <a className='link' href="mailto:students-support@etutor.in">students-support@etutor.in</a> or 6383301842.
        </p>
      </div>
    </div>
  );
};

export default Policy;