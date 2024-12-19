import React from 'react';
import '../../Styles/About/hero.css';
import heroIcon from '../../Assets/hero.png';
const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Empowering Students to<br />Learn Anytime,<br /> Anywhere.</h1>
        <div className="hero-image">
          <img src={heroIcon} alt="Student learning online" />
        </div>
      </div>

      <div className="why-etutor">
        <h3>Why <span className="highlight">E-Tutor?</span></h3>
        <p>At E-Tutor, we believe in making quality education accessible to everyone. Our platform connects students with experienced tutors in a wide variety of subjects, offering personalized learning experiences from the comfort of home.</p>
        <button className="find-tutor-button">Find Tutor</button>
      </div>
    </section>
  );
};

export default Hero;