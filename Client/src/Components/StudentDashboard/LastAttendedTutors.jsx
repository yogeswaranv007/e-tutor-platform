// LastAttendedTutors.js
import React from 'react';
import "../../Styles/StudentDashboard/LastAttendedTutors.css";
import Tutor1 from "../../assets/Tutor1.png";
import Tutor2 from "../../assets/Tutor2.png";
import Tutor3 from "../../assets/Tutor3.svg";
const LastAttendedTutors = () => {
  return (
    <div className="last-attended-tutors">
      <h3>Last Attended Tutors</h3>
      <ul>
        <li>
          <img src={Tutor3} alt="Angelina Jolie" />
          <span>Angelina Jolie</span>
        </li>
        <li>
          <img src={Tutor2} alt="Sydney Sweeney" />
          <span>Sydney Sweeney</span>
        </li>
        <li>
          <img src={Tutor1} alt="Ana de Armas" />
          <span>Ana de Armas</span>
        </li>
      </ul>
    </div>
  );
}

export default LastAttendedTutors;
