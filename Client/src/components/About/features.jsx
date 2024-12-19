import React from 'react';
import '../../Styles/About/features.css';
import psIcon from '../../assets/ps.png';
import Time from '../../Assets/time.png';
import Lang from '../../Assets/lang.png';
import Tutor from '../../Assets/tutor.png';
import Tool from '../../Assets/tool.png';

const featuresData1 = [
  {
    title: "Personalized Learning",
    description: "Tutors matched based on student needs",
    iconUrl: psIcon,
    bgColor: "#E8EAFE",
    iconColor: "#2D62ED"
  },
  {
    title: "Flexible Scheduling",
    description: "Book sessions anytime, anywhere",
    iconUrl: Time,
    bgColor: "#E0F8E8",
    iconColor: "#34A853"
  },
  {
    title: "Expert Tutors",
    description: "Qualified and experienced professionals",
    iconUrl: Tutor,
    bgColor: "#FFF0E8",
    iconColor: "#FF6A3D"
  },]
  
  const featuresData2 = [
  {
    title: "Interactive Tools",
    description: "Video conferencing, whiteboard, and more",
    iconUrl: Tool,
    bgColor: "#F2F2F2",
    iconColor: "#333333"
  },
  {
    title: "Multilingual Support",
    description: "Video conferencing, whiteboard, and more",
    iconUrl: Lang,
    bgColor: "#FDE8EF",
    iconColor: "#FF3E6C"
  },
];

const Features = () => {
  return (
    <><section className="features">
      <h2 className="features-title">
        What We <span className="highlight">Offer</span>
      </h2>
      <div className="features-grid">
        {featuresData1.map((feature, index) => (
          <div className="feature-card" style={{ backgroundColor: feature.bgColor }} key={index}>
            <img src={feature.iconUrl} alt={feature.title} className="feature-icon" style={{ color: feature.iconColor }} />
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section><section className="features">
        <div className="features-grid">
          {featuresData2.map((feature, index) => (
            <div className="feature-card" style={{ backgroundColor: feature.bgColor }} key={index}>
              <img src={feature.iconUrl} alt={feature.title} className="feature-icon" style={{ color: feature.iconColor }} />
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section></>
  );
};

export default Features;