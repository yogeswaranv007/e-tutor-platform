import React from 'react';
import '../../Styles/AssignmentPending/QuestionBox.css';

const QuestionBox = () => {
  return (<>
    <h3>Questions:</h3>
    <div className="question-box">
      
      <p>
        Solve the following linear equations. Show all your steps clearly.
      </p>
      <ol>
        <li>Solve for x: 3x + 5 = 20</li>
        <li>Solve for y: 4y - 7 = 2y + 13</li>
        <li>Solve for z: 5(z - 2) = 3z + 8</li>
        <li>Solve for x: 2(x + 4) - 3 = x + 9</li>
        <li>Solve for a: 7(a - 1) = 2(3a + 4)</li>
      </ol>
    </div>
    </>
  );
};

export default QuestionBox;
