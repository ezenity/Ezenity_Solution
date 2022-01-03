import React from 'react';
import { QuestionList } from './mockData/QuestionList';
import { getUnansweredQuestions, QuestionData } from './mockData/QuestionsData';
import { Page } from './Page';
import { PageTitle } from './PageTitle';

// HomePage Component (Container Component)
//  => Responsbile for how things work
//  => ie. fetching any data from web API, and managing state
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
  const handleAskQuestionClick = () => {
    console.log('TODO - move to the AskPage');
  };
  return (
    <Page>
      <div>
        <PageTitle>Unanswered Questions</PageTitle>
        <button onClick={handleAskQuestionClick}>Ask a question</button>
      </div>
      {questionsLoading ? (
        <div>Loading...</div>
      ) : (
        <QuestionList data={questions || []} />
      )}
      {/*<QuestionList data={getUnansweredQuestions()} />*/}
      {/*<QuestionList data={questions} />*/}
    </Page>
  );
};
