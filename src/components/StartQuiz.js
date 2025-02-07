import React from "react";
import { useNavigate } from "react-router-dom";

function StartQuiz() {
  const navigate = useNavigate();

  return (
    <div className="start-quiz">
      <h1>Welcome to the Quiz! 🎮</h1>
      <p>Test your knowledge and see how high you can score!</p>
      <button onClick={() => navigate("/quiz")}>Start Quiz</button>
    </div>
  );
}

export default StartQuiz;