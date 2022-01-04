/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { AnswerData } from '../utils/QuestionsData';
import { Answer } from './Answer';
import { gray5 } from '../assets/css/Styles';

interface Props {
  data: AnswerData[];
}

/**
 * This component will render an unordered list of answers for the
 * given question.
 */
export const AnswerList = ({ data }: Props) => (
  <ul
    css={css`
      list-style: none;
      margin: 10px 0 0 0;
      padding: 0;
    `}
  >
    {data.map((answer) => (
      <li
        css={css`
          border-top: 1px solid ${gray5};
        `}
        key={answer.answerId}
      >
        <Answer data={answer} />
      </li>
    ))}
  </ul>
);
