/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { AnswerData } from './mockData/QuestionsData';
import { gray3 } from './assets/css/Styles';

/**
 * Simply contain the answer data
 */
interface Props {
  data: AnswerData;
}

/**
 * Will render the answer content, who answered the given question
 * and when it was answered
 */
export const Answer = ({ data }: Props) => (
  <div
    css={css`
      padding: 10px 0px;
    `}
  >
    <div
      css={css`
        padding: 10px 0px;
        font-size: 13px;
      `}
    >
      {data.content}
    </div>
    <div
      css={css`
        font-size: 12px;
        font-style: italic;
        color: ${gray3};
      `}
    >
      {`Answered by ${data.userName} on
        ${data.created.toLocaleDateString()}
        ${data.created.toLocaleTimeString()}`}
    </div>
  </div>
);
