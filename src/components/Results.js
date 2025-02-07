import React from "react";
import { useNavigate } from "react-router-dom";

function Results({ score, totalQuestions }) {
  const navigate = useNavigate();

  let feedbackMessage = "Better luck next time! 😊";
  
  if (score === totalQuestions) {
    feedbackMessage = "Perfect score! 🎯 You nailed it! 🎉";
  } else if (score > totalQuestions / 2) {
    feedbackMessage = "Great job! 🎉";
  }

  return (
    <div className="results">
      <h1>Quiz Completed!</h1>
      <p>{feedbackMessage}</p>
      <p>Your Score: <strong>{score} / {totalQuestions}</strong></p>
      <button onClick={() => navigate("/")}>Play Again</button>
    </div>
  );
}

export default Results;
