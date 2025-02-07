import React from "react";
import { useNavigate } from "react-router-dom";

function Results({ score, totalQuestions, setScore }) {
  const navigate = useNavigate();

  let feedbackMessage = "Better luck next time! 😊";
  
  if (score === totalQuestions) {
    feedbackMessage = "Perfect score! 🎯 You nailed it! 🎉";
  } else if (score > totalQuestions / 2) {
    feedbackMessage = "Great job! 🎉";
  }

  const handleRestart = () => {
    setScore(0); // Reset score
    navigate("/");
  };

  return (
    <div className="results">
      <h1>Quiz Completed!</h1>
      <p>{feedbackMessage}</p>
      <p>Your Score: <strong>{score} / {totalQuestions}</strong></p>
      <button onClick={handleRestart}>Play Again</button>
    </div>
  );
}

export default Results;
