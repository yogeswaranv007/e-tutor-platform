import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import '../styles/SessionPayment.css';
import visaIcon from '../assets/visa-icon.png';
import mastercardIcon from '../assets/mastercard-icon.png';
import gpayIcon from '../assets/gpay-icon.svg';

const SessionPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [session, setSession] = useState(null);
  const [tutorProfile, setTutorProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'paypal'

  useEffect(() => {
    if (location.state?.session) {
      setSession(location.state.session);
      fetchTutorProfile(location.state.session.tutorId);
    } else {
      navigate('/find-tutors');
    }
  }, [location.state, navigate]);

  const fetchTutorProfile = async (tutorId) => {
    try {
      const response = await axios.get('/api/profile', {
        params: { userId: tutorId, userType: 'Tutor' }
      });
      
      if (response.data.success) {
        setTutorProfile(response.data.profile);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tutor profile:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [startTime, endTime] = timeString.split('-');
    const [startHour, startMinute] = startTime.split(':');
    const [endHour, endMinute] = endTime.split(':');
    
    const formatTime = (hour, minute) => {
      const h = parseInt(hour);
      const m = parseInt(minute);
      const formattedHour = h > 12 ? h - 12 : h;
      const amPm = h >= 12 ? 'PM' : 'AM';
      return `${formattedHour}:${m.toString().padStart(2, '0')} ${amPm}`;
    };
    
    return `${formatTime(startHour, startMinute)} - ${formatTime(endHour, endMinute)}`;
  };

  const handlePayment = async (paymentMethodType) => {
    if (!user) {
      alert('Please login to book a session');
      navigate('/login');
      return;
    }

    setProcessing(true);
    try {
      // Prepare booking data
      const bookingData = {
        studentId: user._id,
        tutorId: session.tutorId,
        sessionId: session._id || session.id, // Use session ID from availability
        studentName: user.name || user.username,
        tutorName: tutorProfile.name,
        subject: session.lesson,
        date: session.date,
        time: session.time,
        duration: session.duration,
        rate: session.rate,
        paymentMethod: paymentMethodType
      };

      // Make API call to book the session
      const response = await axios.post('/api/book-session', bookingData);
      
      if (response.data.success) {
        alert(`Session booked successfully via ${paymentMethodType}!`);
        navigate('/student-dashboard');
      } else {
        alert(response.data.message || 'Failed to book session');
      }
    } catch (error) {
      console.error('Booking error:', error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Payment failed. Please try again.');
      }
    } finally {
      setProcessing(false);
    }
  };

  // PayPal payment handlers
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: session.rate.toString(),
          currency_code: 'USD'
        },
        description: `Tutoring session: ${session.lesson} with ${tutorProfile.name}`
      }]
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      console.log('Payment completed:', details);
      // Call your booking function with PayPal payment method
      handlePayment('PayPal');
    });
  };

  const onError = (err) => {
    console.error('PayPal error:', err);
    alert('PayPal payment failed. Please try again.');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="payment-page">
        <div className="loading">Loading session details...</div>
      </div>
    );
  }

  if (!session || !tutorProfile) {
    return (
      <div className="payment-page">
        <div className="error">
          <p>Session not found</p>
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <h2>Complete Your <span className="highlight">Session</span> <span className="highlight">Booking</span></h2>
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

            <button 
              className="proceed-button" 
              onClick={(e) => {
                e.preventDefault();
                setPaymentMethod('card');
                handlePayment('Card');
              }}
              disabled={processing}
            >
              {processing ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </form>

          <p className="or-text">OR</p>

          <button 
            className="gpay-button"
            onClick={() => {
              setPaymentMethod('gpay');
              handlePayment('GPay');
            }}
            disabled={processing}
          >
            <img src={gpayIcon} alt="GPay" className="gpay-icon" /> Pay via Gpay
          </button>

          <p className="or-text">OR</p>

          <div className="paypal-container">
            <PayPalScriptProvider 
              options={{ 
                "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "sb", // Use sandbox for testing
                currency: "USD"
              }}
            >
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
                style={{
                  layout: "vertical",
                  color: "gold",
                  shape: "rect",
                  label: "paypal"
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>

        <div className="session-details">
          <h3>Session Details</h3>
          <div className="session-info">
            <div className="info-row">
              <span className="label">Tutor:</span>
              <span className="value">{tutorProfile.name || 'Tutor Name'}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Subject:</span>
              <span className="value">{session.lesson || 'General Tutoring'}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Date:</span>
              <span className="value">{formatDate(session.date)}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Time:</span>
              <span className="value">{formatTime(session.time)}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Duration:</span>
              <span className="value">{session.duration || '1 hour'}</span>
            </div>
            
            <div className="info-row total-row">
              <span className="label">Total Amount:</span>
              <span className="value total-amount">Rs. {session.rate || '0'}</span>
            </div>
          </div>

          <div className="session-summary">
            <h4>Session Summary</h4>
            <p>You are booking a {session.duration || '1 hour'} tutoring session with {tutorProfile.name} for {session.lesson || 'General Tutoring'} on {formatDate(session.date)} at {formatTime(session.time)}.</p>
          </div>

          <button className="go-back-btn" onClick={handleGoBack}>
            ← Back to Session Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionPayment;
