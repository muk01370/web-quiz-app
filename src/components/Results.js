import React from "react";
import { useNavigate } from "react-router-dom";

function Results({ score, totalQuestions }) {
  const feedbackMessage = score > totalQuestions / 2 
    ? "Great job! 🎉" 
    : "Better luck next time! 😊";

  const navigate = useNavigate();

  return (
    <div className="results">
      <h1>Quiz Completed!</h1>
      <p>
        {feedbackMessage} You scored {score} out of {totalQuestions}.
      </p>
      <button onClick={() => navigate("/")}>Play Again</button>
    </div>
  );
}

export default Results;