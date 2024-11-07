import React from 'react';
import '../../Styles/AssignmentStatus/FooterMessage.css';

const FooterMessage = () => {
  return (
    <div className="footer-message">
      <p>Questions? Contact your Tutor before booking</p>
      <button onClick={() => window.location.href = '/chats'}>Message</button>
    </div>
  );
};

export default FooterMessage;
