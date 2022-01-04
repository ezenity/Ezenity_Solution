/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import {
  alignItemsCenter,
  displayFlex,
  justifyContentSpaceBetween,
  PrimaryButton,
} from '../assets/css/Styles';
import { QuestionList } from './QuestionList';
import { getUnansweredQuestions, QuestionData } from '../utils/QuestionsData';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const handleAskQuestionClick = () => {
    navigate('ask');
  };
  return (
    <Page>
      <div
        css={css`
          display: ${displayFlex};
          align-items: ${alignItemsCenter};
          justify-content: ${justifyContentSpaceBetween};
        `}
      >
        <PageTitle>Unanswered Questions</PageTitle>
        <PrimaryButton onClick={handleAskQuestionClick}>
          Ask a question
        </PrimaryButton>
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
