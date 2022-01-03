import React from 'react';
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
  const [questions, setQuestions] = React.useState<QuestionData[]>([]);
  const [questionsLoading, setQuestionsLoading] = React.useState(true);
  React.useEffect(() => {
    console.log('first rendered');
    const doGetUnansweredQuestions = async () => {
      const unansweredQuestions = await getUnansweredQuestions();
      setQuestions(unansweredQuestions);
      setQuestionsLoading(false);
    };
    doGetUnansweredQuestions();
  }, []);
  return (
    <Page>
      <div>
        <PageTitle>Unanswered Questions</PageTitle>
        <button>Ask a question</button>
      </div>
      {/*<QuestionList data={getUnansweredQuestions()} />*/}
      <QuestionList data={questions} />
    </Page>
  );
};
