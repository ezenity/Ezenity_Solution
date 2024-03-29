﻿/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { gray2, gray3 } from '../assets/css/Styles';
import { QuestionData } from '../utils/QuestionsData';
import { Link } from 'react-router-dom';

/*
 * Presentational Component
 *  => Responsible for how things look
 *  => ie. receive data via their props, and also hjave property event handlers
 *      so that their containers can manage user interactions
 */
interface Props {
  data: QuestionData;
  showContent?: boolean; // Adding '?' makes it so that this prop doesn't have to be added to the component that it is being passed in
}

// here we will use the 'toLocale' on the dates to display the different
// country formats based on the browser's locale.
export const QuestionsNotAnswered = ({ data }: Props) => (
  <div
    css={css`
      padding: 10px 0px;
    `}
  >
    <Link
      css={css`
        padding: 10px 0;
        font-size: 19px;
      `}
      to={`/questions/${data.questionId}`}
    >
      {data.title}
    </Link>
    <div
      css={css`
        font-size: 12px;
        font-style: italic;
        color: ${gray3};
      `}
    >
      {`Asked by ${data.userName}
        on ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}
    </div>
  </div>
);

// Here will demostrate that props can be optional so that the consumer doesn't nexessarily have
// to pass it into a component.
export const QuestionsWithOptional = ({ data, showContent }: Props) => (
  <div
    css={css`
      padding: 10px 0px;
    `}
  >
    <Link
      css={css`
        padding: 10px 0;
        font-size: 19px;
      `}
      to={`/questions/${data.questionId}`}
    >
      {data.title}
    </Link>
    {showContent && (
      <div
        css={css`
          padding-bottom: 10px;
          font-size: 15px;
          color: ${gray2};
        `}
      >
        {data.content.length > 50
          ? `${data.content.substring(0, 50)}...`
          : data.content}
      </div>
    )}
    <div
      css={css`
        font-size: 12px;
        font-style: italic;
        color: ${gray3};
      `}
    >
      {`Asked by ${data.userName}
        on ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}
    </div>
  </div>
);

// This is a special object literal which allows the component to define a default value
////----------------------------------------------------------------------------------------------------------------------------
// There is neater way of doing this, which can be seen below, which is added after the destructured component parameter
// // export const QuestionsWithOptional = ({ data, showContent = true }: Props) => ( ... )
QuestionsWithOptional.defaultProps = {
  showContent: true,
};
