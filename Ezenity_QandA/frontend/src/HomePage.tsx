import React from 'react';
import { QuestionList } from './mockData/QuestionList';
import { getUnansweredQuestions } from './mockData/QuestionsData';

export const HomePage = () => (
  <div>
    <div>
      <h2>Unanswered Questions</h2>
      <button>Ask a question</button>
    </div>
    <QuestionList data={getUnansweredQuestions()} />
  </div>
);
