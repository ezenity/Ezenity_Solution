/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { Page } from './Page';
import { getQuestion, postAnswer } from '../utils/QuestionsData';
import React from 'react';
import { AnswerList } from './AnswerList';
import {
  gray3,
  gray6,
  Fieldset,
  FieldContainer,
  FieldLabel,
  FieldTextArea,
  FormButtonContainer,
  PrimaryButton,
  FieldError,
  SubmissionSuccess,
} from '../assets/css/Styles';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppState,
  gettingQuestionAction,
  gotQuestionAction,
} from '../utils/Store';

/**
 * Type representing the form data
 */
type FormData = {
  content: string;
};

export const QuestionPage = () => {
  const dispatch = useDispatch();
  // Get the question being viewedfrom the state fro mthe store
  const question = useSelector((state: AppState) => state.questions.viewing);
  // Local state
  // const [question, setQuestion] = React.useState<QuestionData | null>(null);
  const { questionId } = useParams();
  React.useEffect(() => {
    const doGetQuestion = async (questionId: number) => {
      dispatch(gettingQuestionAction());
      const foundQuestion = await getQuestion(questionId);
      // Local question state
      // setQuestion(foundQuestion);
      dispatch(gotQuestionAction(foundQuestion));
    };
    if (questionId) {
      doGetQuestion(Number(questionId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId]);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormData>({
    mode: 'onBlur',
  });
  const [successfullySubmitted, setSuccessfullySubmitted] =
    React.useState(false);
  const submitForm = async (data: FormData) => {
    const result = await postAnswer({
      questionId: question!.questionId,
      content: data.content,
      userName: 'AntMac',
      created: new Date(),
    });
    setSuccessfullySubmitted(result ? true : false);
  };
  return (
    <Page>
      <div
        css={css`
          background-color: white;
          padding: 15px 20px 20px 20px;
          border-radius: 4px;
          border: 1px solid ${gray6};
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
        `}
      >
        <div
          css={css`
            font-size: 19px;
            font-weight: bold;
            margin: 10px 0px 5px;
          `}
        >
          {question === null ? '' : question.title}
        </div>
        {question !== null && (
          <React.Fragment>
            <p
              css={css`
                margin-top: 0px;
                background-color: white;
              `}
            >
              {question.content}
            </p>
            <div
              css={css`
                font-size: 12px;
                font-style: italic;
                color: ${gray3};
              `}
            >
              {`Ask by ${question.userName} on
                ${question.created.toLocaleDateString()}
                ${question.created.toLocaleTimeString()}`}
            </div>
            <AnswerList data={question.answers} />
            <form
              onSubmit={handleSubmit(submitForm)}
              css={css`
                margin-top: 20px;
              `}
            >
              <Fieldset disabled={isSubmitting || successfullySubmitted}>
                <FieldContainer>
                  <FieldLabel htmlFor="content">Your Answer</FieldLabel>
                  <FieldTextArea
                    id="content"
                    // name="content"
                    {...register('content', {
                      required: true,
                      minLength: 50,
                    })}
                  ></FieldTextArea>
                  {errors.content && errors.content.type === 'required' && (
                    <FieldError>You must enter the answer.</FieldError>
                  )}
                  {errors.content && errors.content.type === 'minLength' && (
                    <FieldError>
                      the answer must be at least 50 characters long.
                    </FieldError>
                  )}
                </FieldContainer>
                <FormButtonContainer>
                  <PrimaryButton type="submit">
                    Submit Your Answer
                  </PrimaryButton>
                </FormButtonContainer>
                {successfullySubmitted && (
                  <SubmissionSuccess>
                    Your answer was successfully submitted!
                  </SubmissionSuccess>
                )}
              </Fieldset>
            </form>
          </React.Fragment>
        )}
      </div>
    </Page>
  );
};
