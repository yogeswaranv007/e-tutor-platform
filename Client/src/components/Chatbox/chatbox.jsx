import React, { useState } from 'react';
import '../../Styles/Chatbox/chatbox.css';
import ana from '../../assets/ana_de_armas.png';
import jesse from '../../Assets/jesse.png';
import saul from '../../Assets/saul.png';
import gus from '../../Assets/gus.png';
import jane from '../../Assets/jane.png';
import andrea from '../../Assets/andrea.png';
import hank from '../../Assets/hank.png';
import walt from '../../Assets/walt.png';
import sendIcon from '../../Assets/send.png';
import attachIcon from '../../Assets/attach.png';

const contacts = [
  { name: "Ana de Armas", profilePic: ana },
  { name: "Jesse Pinkman", profilePic: jesse },
  { name: "Saul Goodman", profilePic: saul },
  { name: "Gus Fring", profilePic: gus },
  { name: "Jane Margolis", profilePic: jane },
  { name: "Andrea Cantillo", profilePic: andrea },
  { name: "Hank Schrader", profilePic: hank },
  { name: "Walter White", profilePic: walt },
];

const Chatbox = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    setMessage("");
  };

  return (
    <div className="chat-interface">
      <div className="sidebar">
        <h2>Chats</h2>
        <input
          type="text"
          className="search-bar"
          placeholder="Search Your Tutors here..."
        />
        <div className="contacts-list">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className={`contact ${index === activeChat ? 'active' : ''}`}
              onClick={() => setActiveChat(index)}
            >
              <img src={contact.profilePic} alt={contact.name} className="contact-img" />
              <span className="contact-name">{contact.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="chat-container">
        <div className="chat-background"></div>
        <div className="chat-header">
          <img src={contacts[activeChat].profilePic} alt={contacts[activeChat].name} className="chat-profile-pic" />
          <span className="chat-name">{contacts[activeChat].name}</span>
          <div className="chat-options">⋮</div>
        </div>
        
        <div className="chat-messages">
          <div className="message received">
            Today’s class was very informative ma'am
          </div>
          <div className="message sent">
            Thanks for your feedback and co-operation
          </div>
        </div>
        
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="message-input"
          />
          <button className="file-button">
            <img src={attachIcon} alt="Attach" className="icon1" />
          </button>
          <button className="send-button" onClick={handleSendMessage}>
            <img src={sendIcon} alt="Send" className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;