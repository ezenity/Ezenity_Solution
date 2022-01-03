import React from 'react';
import { QuestionData } from './QuestionsData';

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
  <div>
    <div>{data.title}</div>
    <div>
      {`Asked by ${data.userName}
        on ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}
    </div>
  </div>
);

// Here will demostrate that props can be optional so that the consumer doesn't nexessarily have
// to pass it into a component.
export const QuestionsWithOptional = ({ data, showContent }: Props) => (
  <div>
    <div>{data.title}</div>
    {showContent && (
      <div>
        {data.content.length > 50
          ? `${data.content.substring(0, 50)}...`
          : data.content}
      </div>
    )}
    <div>
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
