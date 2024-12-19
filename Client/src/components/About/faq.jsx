import React, { useState } from 'react';
import '../../styles/About/faq.css';

const Faq = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <><section className="faq-bg">
      <div className="faq-section">
        <h2>Frequently Asked <span>Questions</span></h2>
        <p className="faq-subtitle">Find answers to commonly asked questions</p>
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <button onClick={() => toggleQuestion(index)} className="faq-question">
                {item.question}
                <span className={`arrow ${openQuestion === index ? 'open' : ''}`}>▼</span>
              </button>
              {openQuestion === index && <p className="faq-answer">{item.answer}</p>}
            </div>
          ))}
        </div>
        <p className="faq-contact">Still have questions? <a href="#">Contact us!</a></p>
      </div>
    </section></>
  );
};

// Sample FAQ data
const faqData = [
  { question: "How many sessions can I have with the tutor?", answer: "You can have as many sessions as needed based on your learning plan." },
  { question: "How do I book a tutoring session?", answer: "To book a session, log in to your account and choose a tutor from the available list." },
  { question: "What should I do if I face technical difficulties during a session?", answer: "If you face technical difficulties, please contact our support team immediately for assistance." },
  { question: "What subscription plans do you offer?", answer: "We offer monthly, quarterly, and annual subscription plans to suit your needs." },
  { question: "What payment options are available?", answer: "We accept major credit cards, PayPal, and other online payment options." }
];

export default Faq;