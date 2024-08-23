import React from 'react';
import './quizresult.css';

const QuizResults = ({ answers, questions, onRetake, onReturn }) => {
  // check answers and questions are defined
  if (!Array.isArray(answers) || !Array.isArray(questions)) {
    return <div>No results available</div>;
  }

  // Calculate total score
  const score = answers.reduce((acc, answer, index) => {
    return answer === questions[index]?.answer ? acc + 1 : acc;
  }, 0);

  return (
    <div className="step-container">
      <h2>Quiz Results</h2>
      <div className="results">
        <p>Your Score: {score} / {questions.length}</p>
        <h3>Correct Answers:</h3>
        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              <strong>{question.question}</strong> - Correct Answer: {question.answer}
            </li>
          ))}
        </ul>
      </div>
      {/* nav button for retake quiz or return to category */}
      <div className="navigation-buttons">
        <button onClick={onRetake} className="btn-retake">Retake Quiz</button>
        <button onClick={onReturn} className="btn-return">Return to Category Selection</button>
      </div>
    </div>
  );
};

export default QuizResults;
