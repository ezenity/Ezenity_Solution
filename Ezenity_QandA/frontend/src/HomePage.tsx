import React from 'react';
import { QuestionList } from './mockData/QuestionList';
import { getUnansweredQuestions } from './mockData/QuestionsData';
import { Page } from './Page';
import { PageTitle } from './PageTitle';

// HomePage Component
export const HomePage = () => (
  <Page>
    <div>
      <PageTitle>Unanswered Questions</PageTitle>
      <button>Ask a question</button>
    </div>
    <QuestionList data={getUnansweredQuestions()} />
  </Page>
);
