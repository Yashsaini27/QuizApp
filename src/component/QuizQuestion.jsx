import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import './quizquestion.css';

const QuizQuestions = ({ questions, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track on which current question user is 
  const [selectedAnswer, setSelectedAnswer] = useState(null);   // hold user select ans for current question
  const [answers, setAnswers] = useState([]);     // store all question ans user select
  const [timeLeft, setTimeLeft] = useState(180);
  const [openDialog, setOpenDialog] = useState(false);
  const [hint, setHint] = useState('');  // store hint related to current question

  // Handle  Next button click
  const handleNext = () => {
    // check user select ans or time is left out
    if (selectedAnswer !== null || timeLeft === 0) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      setSelectedAnswer(null);
      resetTimer();

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        onFinish(newAnswers);
      }
    }
    setOpenDialog(false);
  };

  // Handle Previous button click
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(answers[currentQuestionIndex - 1]);
      setAnswers(answers.slice(0, -1));
      resetTimer();
    }
  };

  // Reset  timer
  const resetTimer = () => {
    setTimeLeft(180);
  };

  // time manage with use effect
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerId);
          setOpenDialog(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId); // Clean up timer for unmount
  }, [currentQuestionIndex]);

  // Provide  hint for  current question
  const provideHint = () => {
    if (questions[currentQuestionIndex]) {
      setHint(`The correct answer is one of the following: ${questions[currentQuestionIndex].options.slice(0, 2).join(', ')}`);
    }
  };

  // check question are pass and valid
  if (!Array.isArray(questions) || questions.length === 0) {
    return <div>No questions available</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="step-container">
      <div className="question-header">
        <span className="question-number">Q{currentQuestionIndex + 1}</span>
        <div className="timer">
          <AccessTimeIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <TipsAndUpdatesOutlinedIcon
          style={{ cursor: 'pointer', marginLeft: '10px' }}
          onClick={provideHint}
          titleAccess="Get a hint"
        />
      </div>
      <div className="question-text">
        {currentQuestion.question}
      </div>
      <div className="options-container">
        {currentQuestion.options.map((option, index) => (
          <div key={index} className="option">
            <input
              type="radio"
              id={`option-${index}`}
              name="answer"
              value={option}
              checked={selectedAnswer === option}
              onChange={() => setSelectedAnswer(option)}
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </div>
        ))}
      </div>
      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="btn-prev">Previous</button>
        <button onClick={handleNext} disabled={selectedAnswer === null && timeLeft !== 0} className="btn-next">Next</button>
      </div>

      {/* Custom Dialog for dialog msg box appear */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Time is Up!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The time for this question has run out. You will be automatically moved to the next question.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNext} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Hint Dialog box for hint box appear */}
      <Dialog
        open={!!hint}
        onClose={() => setHint('')}
        aria-labelledby="hint-dialog-title"
        aria-describedby="hint-dialog-description"
      >
        <DialogTitle id="hint-dialog-title">{"Hint"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="hint-dialog-description">
            {hint}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHint('')} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuizQuestions;
