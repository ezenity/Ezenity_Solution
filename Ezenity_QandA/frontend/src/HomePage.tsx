﻿import React from 'react';
import { QuestionList } from './mockData/QuestionList';
import { getUnansweredQuestions, QuestionData } from './mockData/QuestionsData';
import { Page } from './Page';
import { PageTitle } from './PageTitle';

// HomePage Component
// Below is an example of a 'Render Prop'
//     <QuestionList
//        data = { getUnansweredQuestions() }
//        renderItem = {(question) => <div>{question.title}</div>}
//     />
export const HomePage = () => {
  const [
    questions,
    setQuestions,
  ] = React.useState<QuestionData[]>([]);
  React.useEffect(() => {
    console.log('first rendered');
  }, []);
  return (
    <Page>
      <div>
        <PageTitle>Unanswered Questions</PageTitle>
        <button>Ask a question</button>
      </div>
      {/*<QuestionList data={getUnansweredQuestions()} />*/}
    </Page>
  );
};
