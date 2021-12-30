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
    content: 'TypeScript seems to be getting popular so I wondered whether it is worth my time learning it? What benefits does it give over JavaScript?',
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
        content: 'So, that you can use the JavaScript features of tomorrow, today',
        userName: 'Mac',
        created: new Date(),
      },
    ],
  },
  {
    questionId: 2,
    title: 'Which state management tool should I use?',
    content: 'there seem t obe a fair few state management tools around for React - React, unstated, ... Which one should I use?',
    userName: 'Anthony',
    created: new Date(),
    answers: [],
  },
];