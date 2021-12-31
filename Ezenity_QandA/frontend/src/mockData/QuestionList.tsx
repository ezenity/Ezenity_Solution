import React from 'react';
import { QuestionData } from './QuestionsData';
import { QuestionsNotAnswered } from './Question';
import { QuestionsWithOptional } from './Question';

interface Props {
  data: QuestionData[];
}

export const QuestionList = ({ data }: Props) => (
  <ul>
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
  </ul>
);
