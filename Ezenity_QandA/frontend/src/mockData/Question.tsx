import React from 'react';
import { QuestionData } from './QuestionsData';

interface Props {
  data: QuestionData;
}

// here we will use the 'toLocale' on the dates to display the different
// country formats based on the browser's locale.
export const Question = ({ data }: Props) => (
  <div>
    <div>
      {data.title}
    </div>
    <div>
      {'Asked by ${data.userName} on ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}'}
    </div>
  </div>
);