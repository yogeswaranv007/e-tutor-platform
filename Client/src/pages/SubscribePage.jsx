import React from 'react';
import '../styles/SubscribePage.css';
import visaIcon from '../assets/visa-icon.png';
import mastercardIcon from '../assets/mastercard-icon.png';
import gpayIcon from '../assets/gpay-icon.svg';

const SubscribePage = () => {
  return (
    <div className="payment-page">
      <h2>Get more <span className="highlight">Advantages</span> with <span className="highlight">Subscription</span></h2>
      <div className="payment-container">
        <div className="payment-info">
          <h3>Payment Information</h3>
          <form>
            <div className="input-group">
              <label htmlFor="name">Name on card <span className="required">*</span></label>
              <input type="text" id="name" placeholder="Name on card" />
              <div className="card-icons">
                <img src={visaIcon} alt="Visa" className="Visaicon" />
                <img src={mastercardIcon} alt="Mastercard" className="Mastericon" />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="card-number">Card number <span className="required">*</span></label>
              <input type="text" id="card-number" placeholder="XXXX XXXX XXXX XXXX" />
            </div>

            <div className="input-group">
              <label htmlFor="expiry">Expired date <span className="required">*</span></label>
              <input type="text" id="expiry" placeholder="MM/YY" />
            </div>

            <div className="input-group">
              <label htmlFor="cvv">CVV <span className="required">*</span></label>
              <input type="text" id="cvv" placeholder="CVV" />
            </div>

            <button className="proceed-button">Proceed</button>
          </form>

          <p className="or-text">OR</p>

          <button className="gpay-button">
            <img src={gpayIcon} alt="GPay" className="gpay-icon" /> Pay via Gpay
          </button>
        </div>

        <div className="plan-details">
          <h3>Plan Details</h3>
          <p><strong>Plan:</strong> Standard</p>
          <p><strong>Price:</strong> Rs. 1499</p>
          <p><strong>Validity:</strong> 30 days</p>
          <p><strong>Date:</strong> 11 October 2024</p>
          <p><strong>Tutoring sessions:</strong> 5/day</p>
          <p><strong>Users:</strong> 1</p>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;
