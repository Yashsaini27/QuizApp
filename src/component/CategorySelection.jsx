import React, { useState } from 'react';
import './category.css'

const CategorySelection = ({ onNext }) => {
  // Need to keep track of category user select
  const [selectedCategory, setSelectedCategory] = useState('');

  // Function called when  user click Next
  const handleNext = () => {
    // proceed if category is select
    if (selectedCategory) {
      onNext(selectedCategory);
    }
  };

  return (
    <div className="quiz-app-container">
      <h1 className="app-heading">Quiz App</h1>
      <div className="step-container">
        <h2>Select a Category</h2>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select-category"
        >
          {/* option to select a category */}
          <option value="" disabled>Select a category</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="Technology">Technology</option>
        </select>
        {/* Disable Next button if no category is select if category is select click on next button */}
        <button onClick={handleNext} disabled={!selectedCategory} className="btn-next">
          Next
        </button>
      </div>
    </div>
  );
};

export default CategorySelection;
