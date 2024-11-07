import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SubscriptionPlans.css';
import tickIcon from '../assets/tick-icon.png';

const SubscriptionPlans = () => {
  const navigate = useNavigate();

  const handleSubscribe = (plan) => {
    navigate('/payment', { state: { plan } });
  };

  return (
    <div className="subscription-section">
      <div className="plans-container">
        <div className="plan-card basic-plan">
          <h3 className="plan-title">Basic Plan</h3>
          <p className="plan-price">499<span>/</span>month</p>
          <ul className="plan-benefits">
            <li><img src={tickIcon} alt="Tick" className="tick-icon" />Limited Tutoring Sessions</li>
            <li><img src={tickIcon} alt="Tick" className="tick-icon" />Limited Scheduling Flexibility</li>
            <li><img src={tickIcon} alt="Tick" className="tick-icon" />Basic Tutor Search</li>
            <li><img src={tickIcon} alt="Tick" className="tick-icon" />Limited Files Upload</li>
          </ul>
          <button className="subscribe-button" onClick={() => handleSubscribe('Basic')}>Start Learning</button>
        </div>
        <div className="plan-card standard-plan">
          <h3 className="plan-title">Standard Plan</h3>
          <p className="plan-price">1499<span>/</span>month</p>
          <ul className="plan-benefits">
            <li><img src={tickIcon} alt="Tick" className="tick-icon" />Increased Tutoring Sessions</li>
            <li><img src={tickIcon} alt="Tick" className="tick-icon" />Priority Booking</li>
            <li><img src={tickIcon} alt="Tick" className="tick-icon" />Full Learning Resources</li>
            <li><img src={tickIcon} alt="Tick" className="tick-icon" />Advanced Search Filters</li>
          </ul>
          <button className="subscribe-button" onClick={() => handleSubscribe('Standard')}>Start Learning</button>
        </div>
        <div className="plan-card premium-plan">
          <h3 className="plan-title">Premium Plan</h3>
          <p className="plan-price">2999<span>/</span>month</p>
          <ul className="plan-benefits">
            <li><img src={tickIcon} alt="Tick" className="tick-icon" />Unlimited Tutoring Sessions</li>
            <li><img src={tickIcon} alt="Tick" className="tick-icon" />Flexible Scheduling</li>
            <li><img src={tickIcon} alt="Tick" className="tick-icon" /> One-on-One Mentorship</li>
            <li><img src={tickIcon} alt="Tick" className="tick-icon" /> Family Plan Options</li>
          </ul>
          <button className="subscribe-button" onClick={() => handleSubscribe('Premium')}>Start Learning</button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
