// Defines the structure of the questions we expect to be working with
export interface QuestionData {
  questionId: number;
  title: string;
  content: string;
  userName: string;
  created: Date;
  answers: AnswerData[];
}

// Interface for the structure of the answers we're expceting
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
