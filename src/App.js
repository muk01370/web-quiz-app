import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartQuiz from "./components/StartQuiz";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import "./App.css";

function App() {
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/quiz");
        if (!response.ok) {
          throw new Error("Failed to fetch quiz data");
        }
        const data = await response.json();
        console.log("API Response:", data);

        if (data && Array.isArray(data.questions)) {
          setQuizData(data.questions);
        } else {
          console.error("Unexpected data structure:", data);
          setQuizData([]);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setError(error.message);
        setQuizData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  if (loading) {
    return <div>Loading quiz data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<StartQuiz />} />
          <Route path="/quiz" element={<Quiz quizData={quizData} score={score} setScore={setScore} />} />
          <Route
            path="/results"
            element={<Results score={score} totalQuestions={quizData.length} setScore={setScore} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
