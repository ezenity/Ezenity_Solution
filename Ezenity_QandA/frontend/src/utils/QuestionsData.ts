import { Answer } from '../component/Answer';

/**
 * Defines the structure of the questions we expect to be working with
 */
export interface QuestionData {
  questionId: number;
  title: string;
  content: string;
  userName: string;
  created: Date;
  answers: AnswerData[];
}

/**
 * Interface for the structure of the answers we're expecting
 */
export interface AnswerData {
  answerId: number;
  content: string;
  userName: string;
  created: Date;
}

// Mock questions
const questions: QuestionData[] = [
  {
    questionId: 1,
    title: 'Why should I learn TypeScript?',
    content:
      'TypeScript seems to be getting popular so I wondered whether it is worth my time learning it? What benefits does it give over JavaScript?',
    userName: 'Anthony',
    created: new Date(),
    answers: [
      {
        answerId: 1,
        content: 'To catch problems earlier speeding up your developments',
        userName: 'Ant',
        created: new Date(),
      },
      {
        answerId: 2,
        content:
          'So, that you can use the JavaScript features of tomorrow, today',
        userName: 'Mac',
        created: new Date(),
      },
    ],
  },
  {
    questionId: 2,
    title: 'Which state management tool should I use?',
    content:
      'There seem to be a fair few state management tools around for React - React, unstated, ... Which one should I use?',
    userName: 'Anthony',
    created: new Date(),
    answers: [],
  },
];

/**
 * Simulate a web request for getting a question.
 * -----
 * We are also using a 'union type' in the functions
 * return type. Union type os a mechanism for defining the
 * type that contains values from multiple types.
 * -----
 * @param questionId an ID used to determine the question
 * @returns an object of the QuestionData or null
 */
export const getQuestion = async (
  questionId: number,
): Promise<QuestionData | null> => {
  await wait(500);
  const results = questions.filter((q) => q.questionId === questionId);
  return results.length === 0 ? null : results[0];
};

// Function that returns unanswered questions
export const getUnansweredQuestions = async (): Promise<QuestionData[]> => {
  await wait(500);
  return questions.filter((q) => q.answers.length === 0);
};

// Asynchronous 'wait' function to help with simulating a web API call
// This function will wait asynchronously for the number of milliseconds
// we pass into it. This function uses the native JS 'setTimeout' function
// internally so the it returns after the specified number of milliseconds
//
// Type: void
//     => Is a typeScript-specific type used to represent a non-returning function
//     => Same as in .NET
const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * A function to simulate a search via web request
 * ----
 * We use a array filter and match the criteria to any part of the question title
 * or content
 */
export const searchQuestions = async (
  criteria: string,
): Promise<QuestionData[]> => {
  await wait(500);
  return questions.filter(
    (q) =>
      q.title.toLowerCase().indexOf(criteria.toLowerCase()) >= 0 ||
      q.content.toLowerCase().indexOf(criteria.toLowerCase()) >= 0,
  );
};

/**
 * Simulate a posting of a question
 * ----
 * This function adds the question to the 'question' array using
 * the 'Math.max' method to set the 'questionId' to the next number.
 */
export interface PostQuestionData {
  title: string;
  content: string;
  userName: string;
  created: Date;
}
export const postQuestion = async (
  question: PostQuestionData,
): Promise<QuestionData | undefined> => {
  await wait(500);
  const questionId = Math.max(...questions.map((q) => q.questionId)) + 1;
  const newQuestion: QuestionData = {
    ...question,
    questionId,
    answers: [],
  };
  questions.push(newQuestion);
  return newQuestion;
};

/**
 * Simulate a posting of an answer
 */
export interface PostAnswerData {
  questionId: number;
  content: string;
  userName: string;
  created: Date;
}
export const postAnswer = async (
  answer: PostAnswerData,
): Promise<AnswerData | undefined> => {
  await wait(500);
  const question = questions.filter(
    (q) => q.questionId === answer.questionId,
  )[0];
  const answerInQuestion: AnswerData = {
    answerId: 99,
    ...answer,
  };
  question.answers.push(answerInQuestion);
  return answerInQuestion;
};
