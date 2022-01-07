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
import { getUnansweredQuestions } from '../utils/QuestionsData';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  gettingUnansweredQuestionsAction,
  gotUnansweredQuestionsAction,
  AppState,
} from '../utils/Store';

// HomePage Component (Container Component)
//  => Responsbile for how things work
//  => ie. fetching any data from web API, and managing state
// Below is an example of a 'Render Prop'
//     <QuestionList
//        data = { getUnansweredQuestions() }
//        renderItem = {(question) => <div>{question.title}</div>}
//     />
export const HomePage = () => {
  // Used to dispatch actions
  const dispatch = useDispatch();
  // Gets the unanswered questions state from the store
  // ---- Takes the store's state object and contains logic to return the required part of the state from the store
  const questions = useSelector(
    (state: AppState) => state.questions.unanswered,
  );
  // Get the 'loading' state from the store
  const questionsLoading = useSelector(
    (state: AppState) => state.questions.loading,
  );
  // Local state
  // const [questions, setQuestions] = React.useState<QuestionData[]>([]);
  // const [questionsLoading, setQuestionsLoading] = React.useState(true);
  React.useEffect(() => {
    console.log('first rendered');
    const doGetUnansweredQuestions = async () => {
      // Invoke the action for getting unanswered questions
      dispatch(gettingUnansweredQuestionsAction());
      const unansweredQuestions = await getUnansweredQuestions();
      // Invoke the action forreceving unanswered questions
      dispatch(gotUnansweredQuestionsAction(unansweredQuestions));
      // Local state
      // setQuestions(unansweredQuestions);
      // setQuestionsLoading(false);
    };
    doGetUnansweredQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
