import React, { useState } from 'react';
import Header from '../Components/StudentDashboard/Header.jsx';
import '../Styles/Chats/Chats.css';
import Tutor1 from '../assets/Tutor1.png';
import Tutor2 from '../assets/image 60.png';
import Tutor3 from '../assets/image 61.png';
import Tutor4 from '../assets/image 62.png';
import Tutor5 from '../assets/image 63.png';
import Tutor6 from '../assets/image 65.png';
import Tutor7 from '../assets/image 75.png';
import Tutor8 from '../assets/image 58.png';
import Send_icon from '../assets/image 43.png';
import Attach_icon from '../assets/image 46.png';

const ChatPage = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState("");

  const contacts = [
    { name: "Ana de Armas", profilePic: Tutor1 },
    { name: "Jesse Pinkman", profilePic: Tutor2 },
    { name: "Saul Goodman", profilePic: Tutor3 },
    { name: "Gus Fring", profilePic: Tutor4 },
    { name: "Jane Margolis", profilePic: Tutor5 },
    { name: "Andrea Cantillo", profilePic: Tutor6 },
    { name: "Hank Schrader", profilePic: Tutor7 },
    { name: "Walter White", profilePic: Tutor8 }
  ];

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleSendMessage = () => {
    console.log("Message sent:", message);
    setMessage("");
  };

  return (
    <div className="chat-page">
      <Header />
      <div className="chat-container">
        <div className="contacts-list">
          <input type="text" placeholder="Search Your Tutors here..." className="search-bar" />
          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                key={index}
                className={`contact-item ${selectedContact === contact ? 'selected' : ''}`}
                onClick={() => handleContactClick(contact)}
              >
                <img src={contact.profilePic} alt={contact.name} className="contact-pic" />
                <span>{contact.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="chat-area">
          {selectedContact ? (
            <>
              <div className="chat-header">
                <img src={selectedContact.profilePic} alt={selectedContact.name} className="contact-pic-large" />
                <span>{selectedContact.name}</span>
              </div>
              <div className="chat-messages">
                <div className="message received">Today's class was very informative ma'am</div>
                <div className="message sent">Thanks for your feedback and co-operation</div>
              </div>
              <div className="chat-input-container">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="chat-input"
                />
                <button className="attach-btn">
                  <img src={Attach_icon} alt="Attach" className="icon" />
                </button>
                <button className="send-btn" onClick={handleSendMessage}>
                  <img src={Send_icon} alt="Send" className="icon" />
                </button>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">Select a contact to start chatting</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
