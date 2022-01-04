/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { QuestionData } from './QuestionsData';
import { QuestionsNotAnswered } from './Question';
import { QuestionsWithOptional } from './Question';

import { accent2, fontSize, gray5 } from '../assets/css/Styles';

/*
 * Presentational Component
 *  => Responsible for how things look
 *  => ie. receive data via their props, and also have property event handlers
 *      so that their containers can manage user interactions
 * renderItem: is a function that takes in a parameter containing the question and
 * returns a JSX element
 */
interface Props {
  data: QuestionData[];
  renderItem?: (item: QuestionData) => JSX.Element;
}

/*
 * Here are other examples of mapping a question list:
 * 
    {data.map((question) => (
      <li key={question.questionId}>
        <QuestionsNotAnswered data={question} />
      </li>
    ))}

    {data.map((question) => (
      <li key={question.questionId}>
        <QuestionsWithOptional data={question} />
      </li>
    ))}
  */
export const QuestionList = ({ data, renderItem }: Props) => (
  <ul
    css={css`
      list-style: none;
      margin: 10px 0 0 0;
      padding: 0px 20px;
      background-color: #fff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border-top: 3px solid ${accent2};
      box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
    `}
  >
    {data.map((question) => (
      <li
        key={question.questionId}
        css={css`
          border-top: 1px solid ${gray5};
          :first-of-type {
            border-top: none;
          }
        `}
      >
        {renderItem ? (
          renderItem(question)
        ) : (
          <QuestionsWithOptional data={question} />
        )}
      </li>
    ))}
  </ul>
);
