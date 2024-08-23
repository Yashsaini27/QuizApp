import React, { useState, useEffect, useCallback } from 'react';
import CategorySelection from './component/CategorySelection';
import QuizQuestions from './component/QuizQuestion';
import QuizResults from './component/QuizResult';
import { FaSun, FaMoon } from 'react-icons/fa'; 

const App = () => {
  const [step, setStep] = useState('category');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false); 

  // the fetchQuestions function is meomized using use callback to check it only change when select category change
  const fetchQuestions = useCallback(async () => {
    try {
      const response = await fetch('/question.json'); // data fetch from json file
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched questions:', data);
      // Filter question based on select category
      const filteredQuestions = data.filter(q => q.category === selectedCategory);
      setQuestions(filteredQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }, [selectedCategory]); 

  useEffect(() => {
    if (selectedCategory) {
      fetchQuestions();
    }
  }, [selectedCategory, fetchQuestions]); // Add fetchQuestions as a dependency

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setStep('quiz');
  };

  const handleQuizFinish = (userAnswers) => {
    setAnswers(userAnswers);
    setStep('results');
  };

  const handleRetake = () => {
    setStep('category');
  };

  const handleReturn = () => {
    setStep('category');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`quiz-app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="dark-mode-toggle" style={{ textAlign: 'right', padding: '10px' }}>
        <button onClick={toggleDarkMode} aria-label="Toggle Dark Mode" style={{ marginRight: '0' }}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      {step === 'category' && <CategorySelection onNext={handleCategorySelect} />}
      {step === 'quiz' && <QuizQuestions questions={questions} onFinish={handleQuizFinish} />}
      {step === 'results' && <QuizResults answers={answers} questions={questions} onRetake={handleRetake} onReturn={handleReturn} />}
    </div>
  );
};

export default App;
