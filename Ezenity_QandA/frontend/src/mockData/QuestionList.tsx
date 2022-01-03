import React from 'react';
import { QuestionData } from './QuestionsData';
import { QuestionsNotAnswered } from './Question';
import { QuestionsWithOptional } from './Question';

/*
 * renderItem: is a function that takes in a parameter containing the question and
 * returns a JSX element
 * */
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
  <ul>
    {data.map((question) => (
      <li key={question.questionId}>
        {renderItem ? (
          renderItem(question)
        ) : (
          <QuestionsWithOptional data={question} />
        )}
      </li>
    ))}
  </ul>
);
