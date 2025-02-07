import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Quiz({ quizData, setScore }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isCorrect, setIsCorrect] = useState(undefined);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [streak, setStreak] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setShowFeedback(false);
    setSelectedAnswer("");
    setTimeLeft(30);
  }, [currentQuestion]);

  useEffect(() => {
    if (timeLeft === 0) {
      setShowFeedback(true);
      setIsCorrect(false);
      setStreak(0);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  if (!quizData || !Array.isArray(quizData) || quizData.length === 0) {
    return <div>No quiz data available. Please try again later.</div>;
  }

  const currentQ = quizData[currentQuestion];
  if (!currentQ) return <div>Loading question...</div>;

  const correctAnswer = currentQ.options?.find(option => option.is_correct)?.description || "Correct answer not available.";

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const isCorrectAnswer = answer === correctAnswer;

    if (isCorrectAnswer) {
      setScore(prevScore => prevScore + 1);
      setStreak(prevStreak => prevStreak + 1);
    } else {
      setStreak(0);
    }

    setIsCorrect(isCorrectAnswer);
    setShowFeedback(true);

    if (currentQuestion + 1 >= quizData.length) {
      setTimeout(() => {
        navigate("/results");
      }, 2000);
    }
  };

  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <div className="quiz">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="timer">Time Left: {timeLeft}s</div>
      <div className="streak">Streak: {streak} 🔥</div>
      <h2>Question {currentQuestion + 1}</h2>

      <p>{currentQ.description || "Question not available."}</p>

      <div className="answers">
        {currentQ.options?.map(option => {
          const isSelected = selectedAnswer === option.description;
          return (
            <button
              key={option.id}
              onClick={() => handleAnswer(option.description)}
              aria-label={`Answer: ${option.description}`}
              className={`answer-button ${
                showFeedback
                  ? option.is_correct
                    ? "correct-answer"
                    : isSelected
                    ? "incorrect-answer"
                    : "disabled-answer"
                  : ""
              }`}
              disabled={showFeedback}
            >
              {option.description}
            </button>
          );
        }) || <p>No answers available.</p>}
      </div>

      {showFeedback && (
        <div className="feedback" aria-live="polite">
          <p>{isCorrect ? "Correct! 🎉" : "Incorrect! ❌"}</p>
          {!isCorrect && <p>Correct Answer: {correctAnswer}</p>}      </div>
      )}

      <div className="navigation-buttons">
        <button 
          onClick={() => setCurrentQuestion(currentQuestion - 1)} 
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        <button 
          onClick={() => {
            if (currentQuestion + 1 < quizData.length) {
              setCurrentQuestion(currentQuestion + 1);
            } else {
              navigate("/results");
            }
          }}
          disabled={currentQuestion + 1 >= quizData.length || !showFeedback}
        >
          {currentQuestion + 1 >= quizData.length ? "Submit Quiz" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
