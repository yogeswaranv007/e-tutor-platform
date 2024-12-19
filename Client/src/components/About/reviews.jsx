import React from 'react';
import '../../Styles/About/reviews.css';
import Review1 from '../../Assets/review1.png'
import Review2 from '../../Assets/review2.png'
import Review3 from '../../Assets/jesse.png'
import Review4 from '../../Assets/hank.png'
import Review5 from '../../Assets/walt.png'
import Review6 from '../../Assets/gus.png'

const reviewsData1 = [
  {
    name: "Sydney Sweeney",
    comment: "Mohit helped me channel my preparation and put focused efforts in the right direction. He is really good with cutting the noise off and build focus on the one goal that matters. I have recommended him to my friends.",
    mentee: "Mohith Khanna",
    menteeTitle: "ML engineer, NVIDIA",
    role: "Tutor",
    profileImage: Review2,
  },
  {
    name: "Sajith",
    comment: "The way he understands the students and set plans accordingly, that helps me a lot. And he is being passionate about me when it comes to target completion...",
    mentee: "Ana de Armas",
    menteeTitle: "Engineer, Microsoft",
    role: "Tutor",
    profileImage: Review3,
  }]
  const reviewsData2 = [
  {
    name: "Yoges",
    comment: "Before joining, I wasn't that confident about interviews for AI based roles, though I did have good enough understanding of concepts...",
    mentee: "Joseph",
    menteeTitle: "AI Engineer, Google",
    role: "Tutor",
    profileImage: Review1,
  },
  {
    name: "Kathir",
    comment: "I would like to express my appreciation for the recent meeting, which I found to be exceptionally helpful and informative...",
    mentee: "Olivia",
    menteeTitle: "Devops Tutor",
    role: "Tutor",
    profileImage: Review4,
  }
  ]
  const reviewsData3 = [
  {
    name: "Rahul Vansh",
    comment: "Thank you sir for analyzing my CV and always guiding me and supporting me whenever needed. I am always grateful to become your mentee.",
    mentee: "Chetan Mahajan",
    menteeTitle: "Advanced Analytics Specialist",
    role: "Tutor",
    profileImage: Review5,
  },
  {
    name: "Subham Jain",
    comment: "The personalized tutoring sessions have completely transformed my understanding of complex subjects. My grades have improved significantly...",
    mentee: "William",
    menteeTitle: "Computer Science",
    role: "Tutor",
    profileImage: Review6,
  },
];

const Reviews = () => {
  return (
    <><><section className="reviews">
      <h2 className="reviews-title">Love & Praise by Mentees</h2>
      <p className="reviews-subtitle">Get inspired by the real-life experiences of our mentees and their journey to success with E-Tutor</p>
      <div className="reviews-grid">
        {reviewsData1.map((review, index) => (
          <div className="review-card" key={index}>
            <div className="review-header">
              <img src={review.profileImage} alt={review.name} className="profile-image" />
              <div>
                <h3 className="review-name">{review.name}</h3>
              </div>
            </div>
            <p className="review-comment">{review.comment}</p>
            <div className="review-footer">
              <p className="mentee-name">{review.mentee}</p>
              <p className="mentee-title">{review.menteeTitle}</p>
              <span className="role">{review.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section><section className="reviews">
        <div className="reviews-grid">
          {reviewsData2.map((review, index) => (
            <div className="review-card" key={index}>
              <div className="review-header">
                <img src={review.profileImage} alt={review.name} className="profile-image" />
                <div>
                  <h3 className="review-name">{review.name}</h3>
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
              <div className="review-footer">
                <p className="mentee-name">{review.mentee}</p>
                <p className="mentee-title">{review.menteeTitle}</p>
                <span className="role">{review.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section></>
      <section className="reviews">
        <div className="reviews-grid">
          {reviewsData3.map((review, index) => (
            <div className="review-card" key={index}>
              <div className="review-header">
                <img src={review.profileImage} alt={review.name} className="profile-image" />
                <div>
                  <h3 className="review-name">{review.name}</h3>
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
              <div className="review-footer">
                <p className="mentee-name">{review.mentee}</p>
                <p className="mentee-title">{review.menteeTitle}</p>
                <span className="role">{review.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section></>
  );
};

export default Reviews;